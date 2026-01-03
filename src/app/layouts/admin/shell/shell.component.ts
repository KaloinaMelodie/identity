import { Component, OnInit, OnDestroy } from '@angular/core';

declare global {
  interface Window {
    AdminMain?: { init(): void };
  }
}

@Component({
  selector: 'div[app-admin-shell]',
  standalone: false,
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
})


export class ShellComponent implements OnInit, OnDestroy {

  private links: HTMLLinkElement[] = [];

  private loadScript(src: string): Promise<void> {
  return new Promise(resolve => {
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}

  ngOnInit() {
    const styles = [
      "assets/bo/vendor/bootstrap/css/bootstrap.min.css",
      "assets/bo/vendor/bootstrap-icons/bootstrap-icons.css",
      // "assets/bo/vendor/boxicons/css/boxicons.min.css",
      "assets/bo/vendor/quill/quill.snow.css",
      "assets/bo/vendor/quill/quill.bubble.css",
      "assets/bo/vendor/remixicon/remixicon.css",
      "assets/bo/vendor/simple-datatables/style.css",
      "assets/bo/css/style.css"
    ];

    styles.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
      this.links.push(link);
    });

     const scripts = [
    "assets/bo/vendor/bootstrap/js/bootstrap.bundle.min.js",
    "assets/bo/vendor/quill/quill.min.js",
    "assets/bo/vendor/simple-datatables/simple-datatables.js",
    "assets/bo/vendor/tinymce/tinymce.min.js",
    "assets/bo/vendor/php-email-form/validate.js",

    "assets/bo/js/main.js",

    "assets/bo/js/main-wrapper.js"
  ];

  scripts.reduce((p, src) => {
    return p.then(() => this.loadScript(src));
  }, Promise.resolve())
  .then(() => {
    window.AdminMain?.init();
  });
  }

  ngOnDestroy() {
    // Important : supprimer les styles quand quittes l’espace admin
    this.links.forEach(link => document.head.removeChild(link));
  }
}