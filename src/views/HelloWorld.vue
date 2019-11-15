<template>
  <div class="columns is-multiline box">
    <div class="column">
      <h2 class="subtitle">Hi Vishal {{ new Date() | isodate }}</h2>
      <SearchableInput />
      <b-field label="Select time">
            <b-clockpicker
                placeholder="Click to select..."
                icon="clock"
                hour-format="12">
            </b-clockpicker>
        </b-field>
         <div class="field">
            <b-checkbox v-model="checkbox" >
                {{ checkbox }}
            </b-checkbox>
        </div>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Text input" />
        </div>
      </div>

      <div class="field">
        <label class="label">Username</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input is-success" type="text" placeholder="Text input" value="bulma" />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
        <p class="help is-success">This username is available</p>
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input is-danger" type="email" placeholder="Email input" value="hello@" />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>
        <p class="help is-danger">This email is invalid</p>
      </div>

      <div class="field">
        <label class="label">Subject</label>
        <div class="control">
          <div class="select">
            <select>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Message</label>
        <div class="control">
          <textarea class="textarea" placeholder="Textarea"></textarea>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input type="checkbox" />
            I agree to the
            <a href="#">terms and conditions</a>
          </label>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <label class="radio">
            <input type="radio" name="question" />
            Yes
          </label>
          <label class="radio">
            <input type="radio" name="question" />
            No
          </label>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link">Submit</button>
        </div>
        <div class="control">
          <button class="button is-text">Cancel</button>
        </div>
      </div>
    </div>
    <div class="column"></div>
    <!--form-->
    <div class="column is-full">
      <div class="panel">
        <p class="panel-heading">repositories</p>
        <div class="panel-block">
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>One</th>
                <th>Two</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Three</td>
                <td>Four</td>
              </tr>
              <tr>
                <td>Five</td>
                <td>Six</td>
              </tr>
              <tr>
                <td>Seven</td>
                <td>Eight</td>
              </tr>
              <tr>
                <td>Nine</td>
                <td>Ten</td>
              </tr>
              <tr>
                <td>Eleven</td>
                <td>Twelve</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
