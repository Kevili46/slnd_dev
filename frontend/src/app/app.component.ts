import { afterNextRender, Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@features/header/header.component';
import { UtilityService } from '@core/services/utility.service';
import { FooterComponent } from '@features/footer/footer.component';
import { AiAgentComponent } from '@features/ai-agent/ai-agent.component';
import { IdService } from '@core/services/id/id.service';

@Component({
  selector: 'slnd',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AiAgentComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  private renderer: Renderer2 = inject(Renderer2);
  private utilityService: UtilityService = inject(UtilityService);
  private idService: IdService = inject(IdService);
  private elRef: ElementRef = inject(ElementRef);

  public readonly darkMode = this.utilityService.darkMode;

  private resizeObserver?: ResizeObserver;
  private cleanup?: () => void;

  constructor() {
    afterNextRender(() => {
      this.idService.initializeUser();

      this.initResizeObserver();

      window.addEventListener('load', this.elRef.nativeElement.classList.remove('load'));

      this.cleanup = this.renderer.listen('window', 'scroll', () => {
        this.utilityService.scrollUpdate();
      });
    });
  }

  private initResizeObserver() {
    const element = this.elRef.nativeElement;
    let ticking = false;

    this.resizeObserver = new ResizeObserver((entries) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!entries.length) return;
          this.utilityService.resizeUpdate(this.elRef);
          ticking = false;
        });
        ticking = true;
      }
    })

    this.resizeObserver.observe(element);
  }

  ngOnDestroy() {
    if (this.cleanup) {
      this.cleanup();
    }
  }

  public readonly title = 'SLND';
}

