<template>
  <div>
    <div class="header">
      <div class="header-logo"></div>
      <button class="header-button">Произвести биоробота</button>
    </div>


    <div class="mine">
      <div class="mine-text">
        <h1 class="mine-text-title">Фабрика по производству биороботов</h1>
        <span class="mine-text-subtitle">класса «монитор-кресло»</span>
      </div>

      <div class="mine-image"></div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 48px;

  &-logo {
    width: 78px;
    height: 48px;
    background: url("../assets/logo.svg") no-repeat center;
  }

  &-button {
    padding: 12px 20px;
    background: transparent;
    color: #fff;
    border-radius: 50px;
    border: 2px solid #FF7F22;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;

    &:hover {
      cursor: pointer;
      background: #FF5722;
      border-color: #FF5722;
    }

    &:active {
      background: #FF7F22;
      border-color: #FF7F22;
    }

    &:disabled {
      border: 2px solid #4C5865;
      background: transparent;
      color: #4C5865;
      cursor: not-allowed;
    }
  }
}

.mine {
  margin-top: 96px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  flex-shrink: 0;
  -moz-column-gap: 50px;
  -webkit-column-gap: 50px;
  column-gap: 50px;
  margin-bottom: 124px;

  &-text {
    max-width: 470px;

    &-title {
      font-style: normal;
      font-weight: 600;
      font-size: 56px;
      line-height: 72px;
      color: #FFFFFF;
      margin-bottom: 24px;
    }

    &-subtitle {
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;
      color: #A3B8CC;
    }
  }

  &-image {
    width: 366px;
    height: 320px;
    background: url("../assets/header_image.png") no-repeat center;
  }
}
</style>