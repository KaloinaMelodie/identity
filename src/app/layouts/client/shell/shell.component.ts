import { Component, ViewEncapsulation, OnInit, OnDestroy  } from '@angular/core';

@Component({
  selector: 'div[app-shell]',
  standalone: false,
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
})
export class ShellComponent implements OnInit, OnDestroy {

  private links: HTMLLinkElement[] = [];

  ngOnInit() {
    const styles = [
      "assets/css/bootstrap.min.css",
      "assets/css/owl.carousel.min.css",
      "assets/css/owl.theme.default.min.css",
      "assets/css/animate.min.css",
      "assets/css/jquery.pagepiling.css",
      "assets/css/jquery.fancybox.min.css",
      "assets/css/LineIcons.css",
      "assets/css/style.css" // Main CSS
    ];

    styles.forEach(href => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
      this.links.push(link);
    });
  }

  ngOnDestroy() {
    // On supprime les styles quand on quitte la partie client
    this.links.forEach(link => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    });
  }
}