import { Injectable } from '@angular/core'
import { Alert } from 'bootstrap'
import { IAlert } from '../alert.interface'

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  add(alert: IAlert, time: number | undefined = undefined): void {
    var boxMessage = document.getElementById('box-alerts')
    if (boxMessage) {
      var buttonClose = time
        ? ''
        : '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
      var wrapper = document.createElement('div')
      wrapper.style.display = 'flex'
      wrapper.style.justifyContent = 'flex-end'
      wrapper.innerHTML =
        '<div class="alert alert-' +
        alert.type +
        ' alert-dismissible" role="alert">' +
        alert.message +
        buttonClose +
        '</div>'
      boxMessage.append(wrapper)
      var alertDOM = new Alert(wrapper)
      if (time) {
        setTimeout(() => {
          alertDOM.close()
        }, time)
      }
    }
  }
}
