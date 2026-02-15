import fs from 'fs';
import path from 'path';

export function loadJsonFile<T>(relativePath: string, defaultValue: T): T {
  const filePath = path.join(__dirname, '..', '..', relativePath);

  try {
    if (!fs.existsSync(filePath)) {
      return defaultValue;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    if (!content.trim()) {
      return defaultValue;
    }
    return JSON.parse(content) as T;
  } catch {
    return defaultValue;
  }
}

export function saveJsonFile<T>(relativePath: string, data: T): void {
  const filePath = path.join(__dirname, '..', '..', relativePath);
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}
