export default function Contact() {
  return (
    <main className="container-app">
      <h1 className="text-3xl font-bold mb-8">Contact</h1>

      <div className="flex gap-4">
        <div className="flex flex-col gap-2 ">
          <span>E-mail:</span>
          <span>Instagram:</span>
        </div>

        <div className="flex flex-col gap-2 ">
          <a
            href="mailto:swyturkishdelegation@gmail.com"
            className="text-blue-600"
          >
            swyturkishdelegation@gmail.com
          </a>

          <a
            href="https://www.instagram.com/swy35_turkiye"
            target="_blank"
            rel="noreferrer noopener"
            className="text-blue-600"
          >
            @swy35_turkiye
          </a>
        </div>
      </div>
    </main>
  );
}
