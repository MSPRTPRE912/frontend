import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-button',
    imports: [CommonModule],
    templateUrl: './button.component.html',
    styleUrl: './button.component.css'
})
export class ButtonComponent {
    @Input() label = "";
    @Input() type: string = "primary";
    @Input() clickType: string = "submit";
    @Input() color: string = "secondary-color";
    @Output() clickAction = new EventEmitter();
    hover: boolean = false;

    constructor() { }

    ngOnInit(): void {
        this.color = (this.color.includes('#')) ? this.color : "var(--"+this.color+")";
    }

    onClick(){
        this.clickAction.emit();
    }
}
