<template>
  <div class="not-found">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1>Page Not Found</h1>
      <p>Sorry, the requested page does not exist.</p>
      <router-link to="/" class="home-link"> Back to Home </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;

  .not-found-content {
    text-align: center;
    color: #495057;
    max-width: 500px;

    .error-code {
      font-size: 128px;
      font-weight: 700;
      margin: 0;
      line-height: 1;
      color: #e9ecef;

      @media (max-width: 768px) {
        font-size: 96px;
      }

      @media (max-width: 480px) {
        font-size: 64px;
      }
    }

    h1 {
      font-size: 32px;
      margin: 0 0 16px 0;
      font-weight: 600;
      color: #212529;

      @media (max-width: 768px) {
        font-size: 28px;
      }

      @media (max-width: 480px) {
        font-size: 24px;
      }
    }

    p {
      font-size: 19px;
      margin: 0 0 32px 0;
      opacity: 0.9;
      line-height: 1.6;

      @media (max-width: 768px) {
        font-size: 18px;
      }
    }

    .home-link {
      display: inline-block;
      background: #212529;
      color: white;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 4px;
      font-weight: 500;
      font-size: 16px;
      transition: all 0.2s ease;
      border: 1px solid #212529;

      &:hover {
        background: #495057;
        border-color: #495057;
      }

      @media (max-width: 768px) {
        padding: 10px 20px;
        font-size: 14px;
      }
    }
  }
}
</style>
