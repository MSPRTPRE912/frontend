import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-input',
    imports: [CommonModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: InputComponent,
        },
    ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
    @Input() label: string = "";
    @Input() type: string = "text";
    @Input() width: string = "90%";

    value: string = "";
    onChange = (string: any) => {};
    onTouched = () => {};

    constructor() { }

    writeValue(value: string): void {
        this.value = value;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {}

    ngOnInit(): void {
    }

    onValueChange(data: any) {
        this.onChange(data.target.value);
    }

}
