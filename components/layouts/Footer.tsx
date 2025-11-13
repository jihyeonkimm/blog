export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto py-6 flex flex-col gap-6 items-center justify-center">
        <div className="flex gap-2 items-center justify-center">
          <a href="https://jh-log.tistory.com/" target="_blank">
            <p className="text-muted-foreground text-xs">이전 블로그</p>
          </a>
          <p className="text-muted-foreground text-xs">|</p>

          <a href="https://github.com/jihyeonkimm" target="_blank">
            <p className="text-muted-foreground text-xs">GitHub</p>
          </a>
        </div>
        <p className="text-muted-foreground text-sm">©️ Jihyeon Kim 2025</p>
      </div>
    </footer>
  );
}
