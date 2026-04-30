#!/usr/bin/env bash
set -euo pipefail

TASK_FILE="${TASK_FILE:-task.md}"
CHECKER="${CHECKER:-scripts/check-task-progress.mjs}"
AGENT_CMD="${AGENT_CMD:-}"
MAX_CYCLES="${MAX_CYCLES:-0}"

if [[ ! -f "$TASK_FILE" ]]; then
  echo "Errore: file '$TASK_FILE' non trovato."
  exit 1
fi

if [[ -z "$AGENT_CMD" ]]; then
  cat <<'EOF'
Errore: AGENT_CMD non impostata.

Imposta AGENT_CMD con un comando che accetta il prompt come ultimo argomento.
Esempio:
AGENT_CMD='cursor-agent run --prompt'
bash scripts/agent-loop.sh
EOF
  exit 1
fi

cycle=0

while true; do
  next_tool="$(node "$CHECKER" --task-file "$TASK_FILE")"

  if [[ "$next_tool" == "DONE" ]]; then
    echo "Tutte le task in '$TASK_FILE' risultano completate."
    break
  fi

  cycle=$((cycle + 1))
  echo ""
  echo "=== Ciclo #$cycle | Tool: $next_tool ==="

  prompt="Esegui task.md fino a completare il tool corrente '$next_tool' rispettando le regole:
- un tool alla volta
- se bloccato 3 volte marca SKIPPED e passa oltre
- ordine: crea pagina -> implementa -> testa -> build -> SEO -> aggiorna task.md
- quando finisci '$next_tool', aggiorna task.md e continua solo al prossimo turn."

  # shellcheck disable=SC2086
  eval "$AGENT_CMD \"\$prompt\""

  if [[ "$MAX_CYCLES" -gt 0 && "$cycle" -ge "$MAX_CYCLES" ]]; then
    echo "Raggiunto MAX_CYCLES=$MAX_CYCLES, termino loop."
    break
  fi
done
