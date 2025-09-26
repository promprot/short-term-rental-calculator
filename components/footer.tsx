import { Github, X, Mail, Globe } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left space-y-2">
            <p>
              © 2025{" "}
              <a
                href="https://creativesky.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors duration-200 underline"
              >
                CreativeSky.AI
              </a>
            </p>
            <p>Estimates based on 2025 tax laws and OBBBA; consult a tax professional.</p>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="https://creativesky.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 p-2 -m-2"
              aria-label="Visit our website"
            >
              <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            <a
              href="https://x.com/CreativeSkyAI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 p-2 -m-2"
              aria-label="Follow us on X"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            <a
              href="https://github.com/promprot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 p-2 -m-2"
              aria-label="View our GitHub"
            >
              <Github className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 p-2 -m-2"
              aria-label="Contact us"
            >
              <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
