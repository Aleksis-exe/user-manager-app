import { Injectable } from '@angular/core'
import { TypeAlert } from './modules/alert/alert.interface'
import { AlertService } from './modules/alert/services/alert.service'

@Injectable({ providedIn: 'root' })
export class ErrorHandler {
  constructor(private alert: AlertService) {}

  handler(error: any): void {
    console.error('response', error)
    let message = error.message
    if (error.error.error) {
      error.error.error.forEach((e: string) => {
        message = message + '</br>' + e
      })
    }
    if (error.error.errors) {
      let keys = Object.keys(error.error.errors)
      console.log('keys', keys)
      for (var key in keys) {
        console.log('key', error.error.errors[keys[key]])
        error.error.errors[keys[key]].forEach((element: string) => {
          message = message + '</br>' + element
        })
      }
    }
    this.alert.add({
      message: message,
      type: TypeAlert.danger,
    },4000)
  }
}
