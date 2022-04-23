import { FormGroup } from '@angular/forms';

export interface PropsFilterStatePrototypes {
}

export interface IPropsFilterView {
    filterGroup: FormGroup;
    ngOnInit(): void;
    filterForm(): void;
    filter(): void;
}

