export async function register() {
  // 最初期に preload/preinit をダミー化
  await import('./react-preload-shim');
}
