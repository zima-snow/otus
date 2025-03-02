import process from 'process';
import readline from 'readline/promises';

export const prompt = async (message) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await rl.question(message);

  rl.close();

  return answer;
};

export const exitOnAnyKey = () => {
  process.stdin.on("data", () => {
    process.exit();
  });
}
