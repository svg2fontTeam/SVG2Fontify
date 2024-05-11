export function notify(msg: string, isErr: boolean, timeout: number) {
  figma.notify(msg, { error: isErr, timeout: timeout });
}
