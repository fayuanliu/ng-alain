import { Component } from '@angular/core';
import { RandomUserService } from "../randomUser.service";
import { NzMessageService } from "ng-zorro-antd";

@Component({
    selector: 'app-table-full',
    templateUrl: './full.component.html',
    styleUrls: ['./full.component.scss']
})
export class TableFullComponent {

    pi = 1;
    ps = 10;
    total = 200; // mock total
    list = [];
    loading = false;
    args = {};

    load(pi?: number) {
        if (typeof pi !== 'undefined') this.pi = pi || 1;

        this.loading = true;
        this._allChecked = false;
        this._indeterminate = false;
        this._randomUser.getUsers(this.pi, this.ps, this.args)
            .map(data => {
                data.results.forEach(item => {
                    item.checked = false;
                });
                return data;
            })
            .subscribe(data => {
                this.loading = false;
                this.list = data.results;
            })
    }

    clear() {
        this.args = {};
        this.load(1);
    }

    _indeterminate = false;
    _allChecked = false;
    _checkAll() {
        this.list.forEach(item => item.checked = this._allChecked);
        this.refChecked();
    }
    refChecked() {
        const checkedCount = this.list.filter(w => w.checked).length;
        this._allChecked = checkedCount === this.list.length;
        this._indeterminate = this._allChecked ? false : checkedCount > 0;
    }

    constructor(private _randomUser: RandomUserService, private message: NzMessageService) {
    }

    ngOnInit() {
        this.load();
    }

    showMsg(msg: string) {
        this.message.info(msg);
    }
}
