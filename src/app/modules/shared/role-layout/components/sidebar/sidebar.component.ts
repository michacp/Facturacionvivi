import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
 isCollapsed = false;
  facturasOpen = false;
  productosOpen = false;
  ventasOpen = false;

  toggleMenu(menu: string) {
    if (menu === 'facturas') this.facturasOpen = !this.facturasOpen;
    if (menu === 'productos') this.productosOpen = !this.productosOpen;
    if (menu === 'ventas') this.ventasOpen = !this.ventasOpen;
  }
}
