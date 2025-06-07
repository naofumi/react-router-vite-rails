import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="loaderable"
export default class extends Controller {
  connect() {
  }

  disconnect(event) {
    this.element.ariaBusy = false
  }

  activate() {
    this.element.ariaBusy = true
  }
}
