export async function streamText(
  fullText: string,
  onUpdate: (partial: string) => void,
  speed = 25
) {
  let current = '';

  for (let i = 0; i < fullText.length; i++) {
    current += fullText[i];
    onUpdate(current);
    await new Promise(res => setTimeout(res, speed));
  }
}
