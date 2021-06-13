import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'saveHtml'
})
export class SaveHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){}

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(style) {
    return this.sanitizer.bypassSecurityTrustHtml(style);
    //return this.sanitizer.bypassSecurityTrustStyle(style);
    // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
  }

}
