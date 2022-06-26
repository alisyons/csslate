import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SlateComponent } from './components/slate/slate.component';
import { InstructionsComponent } from './components/slate/instructions/instructions.component';
import { EditorComponent } from './components/slate/editor/editor.component';
import { BoardComponent } from './components/slate/board/board.component';
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TextFieldModule} from "@angular/cdk/text-field";
import {CookieService} from "ngx-cookie-service";
import { InfoComponent } from './components/info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OnboardingComponent,
    FooterComponent,
    SlateComponent,
    InstructionsComponent,
    EditorComponent,
    BoardComponent,
    InfoComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        TextFieldModule
    ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
