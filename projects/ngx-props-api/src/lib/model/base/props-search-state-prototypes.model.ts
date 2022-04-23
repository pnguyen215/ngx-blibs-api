import { FormGroup } from "@angular/forms";

export interface PropsSearchStatePrototypes {
}

export interface IPropsSearchView {
    searchGroup: FormGroup;
    ngOnInit(): void;
    searchForm(): void;
    search(searchTerm: string): void;
}