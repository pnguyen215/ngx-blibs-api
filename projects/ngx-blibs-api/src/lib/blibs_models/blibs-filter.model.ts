import { FormGroup } from '@angular/forms';

export interface IBlibsFilterView {
    filterGroup: FormGroup;
    ngOnInit(): void;
    filterForm(): void;
    filter(): void;
}