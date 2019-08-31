<template>
  <div class="columns is-multiline box">
    <h2 class="subtitle">My Profile</h2>
    <div class="column is-full card">
      <div class="card-header">
        <div class="card-header-title">Vishal</div>
      </div>
      <div class="card-content">
        <p
          class="title"
        >“There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.”</p>
        <p class="subtitle">Jeff Atwood</p>
      </div>
      <footer class="card-footer">
        <p class="card-footer-item">
          <span>
            View on
            <a href="https://twitter.com/codinghorror/status/506010907021828096">Twitter</a>
          </span>
        </p>
        <p class="card-footer-item">
          <span>
            Share on
            <a href="#">Facebook</a>
          </span>
        </p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      userName: "Vishal Gangwar"
    };
  }
};
</script>