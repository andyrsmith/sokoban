const createRetryButton = (text) => {
  const button = `
    <button class="button is-primary is-large"
      style="width: 200px">
      <span>${text}</span>
    </button>
    `

  return button
}

const createDefaultButton = (text) => {
  const button = `
  <button class="button is-large"
    style="width: 200px">
    <span>${text}</span>
  </button>
  `

return button
}

export {
  createRetryButton,
  createDefaultButton
}