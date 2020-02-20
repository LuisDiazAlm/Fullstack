import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FooterComponent } from './footer/footer/footer.component';
import { HeaderComponent } from './header/header/header.component';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav/side-nav.component';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';

@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // ProviderModule
  ],
  exports: [HeaderComponent, SideNavComponent, FooterComponent, BreadcumbsComponent],
  declarations: [FooterComponent, SideNavComponent, HeaderComponent, BreadcumbsComponent],

})
export class TemplateModule { }
