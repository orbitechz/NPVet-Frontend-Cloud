import { NgModule } from '@angular/core';

import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { BellFill, DoorOpenFill, Eye, EyeSlash ,X, Dash, PlusLg, PlusCircleFill ,Search, ArrowClockwise, PenFill, TrashFill, Plus } from 'ng-bootstrap-icons/icons';

const icons = {
  TrashFill,
  PenFill,
  ArrowClockwise,
  Search,
  PlusCircleFill,
  PlusLg,
  Plus, 
  Dash,
  X,
  Eye,
  EyeSlash,
  DoorOpenFill,
  BellFill
};

@NgModule({
  imports: [
    BootstrapIconsModule.pick(icons)
  ],
  exports: [
    BootstrapIconsModule
  ]
})
export class IconsModule { }