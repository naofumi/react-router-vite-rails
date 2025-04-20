import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="loadable"
export default class extends Controller {
  connect() {
  }

  disconnect(event) {
    this.element.ariaDisabled = false
  }

  activate() {
    this.element.ariaDisabled = true
  }
}
