class List extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  async connectedCallback () {
    await this.loadData()
    await this.render()
    this.title = this.getAttribute('title')
  }

  async loadData () {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/front/users`)

    if (response.ok) {
      this.data = await response.json()
    } else {
      console.log(response)
    }
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
        <style>
            ul{
                list-style:none;
                padding: 0;
            }
            li {
              color: hsl(0, 0%, 100%);
            }
        </style>
        <button data-id="2">Load</button>
        <ul></ul>
        `

    const list = this.shadow.querySelector('ul')

    this.data.forEach(element => {
      const li = document.createElement('li')
      li.textContent = element.name + ' - ' + element.email
      list.appendChild(li)
    })
  }
}

customElements.define('list-component', List)
