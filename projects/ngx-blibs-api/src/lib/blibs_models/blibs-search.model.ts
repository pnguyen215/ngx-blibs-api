import { FormGroup } from '@angular/forms';

export interface IBlibsSearchView {
    searchGroup: FormGroup;
    ngOnInit(): void;
    searchForm(): void;
    search(searchTerm: string): void;
}
