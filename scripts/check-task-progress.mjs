#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";

function parseArgs(argv) {
  const out = {
    taskFile: "task.md",
    mode: "next",
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--task-file") {
      out.taskFile = argv[i + 1] ?? out.taskFile;
      i += 1;
      continue;
    }
    if (arg === "--summary") {
      out.mode = "summary";
      continue;
    }
  }

  return out;
}

function readTasks(taskFilePath) {
  const absolutePath = path.resolve(process.cwd(), taskFilePath);
  const raw = readFileSync(absolutePath, "utf8");
  const lines = raw.split(/\r?\n/);

  const pending = [];
  const done = [];

  for (const line of lines) {
    const pendingMatch = line.match(/^- \[ \] ([a-z0-9-]+)\s*$/i);
    if (pendingMatch) {
      pending.push(pendingMatch[1]);
      continue;
    }

    const doneMatch = line.match(/^- \[x\] ([a-z0-9-]+)\s*$/i);
    if (doneMatch) {
      done.push(doneMatch[1]);
    }
  }

  return { pending, done };
}

const args = parseArgs(process.argv.slice(2));
const { pending, done } = readTasks(args.taskFile);

if (args.mode === "summary") {
  process.stdout.write(
    `${JSON.stringify(
      {
        done: done.length,
        pending: pending.length,
        next: pending[0] ?? null,
      },
      null,
      2,
    )}\n`,
  );
  process.exit(0);
}

process.stdout.write(`${pending[0] ?? "DONE"}\n`);
