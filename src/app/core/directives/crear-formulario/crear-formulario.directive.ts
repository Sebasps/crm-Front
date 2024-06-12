import {
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Directive({
  selector: '[appCrearFormulario]',
  standalone: true,
})
export class CrearFormularioDirective implements OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private element: ElementRef<HTMLElement> = inject(ElementRef);
  private estadoFormulario: string;

  constructor(private renderer: Renderer2) {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.estadoFormulario = id === 'nuevo' ? 'Crear ' : 'Actualizar ';
    });

    renderer.setProperty(
      this.element.nativeElement,
      'textContent',
      this.estadoFormulario
    );
  }

  ngOnDestroy(): void {
    return;
  }
}
