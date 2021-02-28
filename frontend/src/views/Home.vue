<template>
  <div class="container">
        
    <div class="card-paramsCompt">
      <div class="row">
        <div class="col-12 col-md-8 col-lg-9">
          <div class="card-header">
            <img src="../assets/images/avatar.jpg" width="45" height="45">
          </div>

          <div class="card-body">
            <form>
                <textarea class="form-control autoExpand" placeholder="On vous écoute!" name="post" rows="6" data-min-rows='1' required></textarea> 
            </form>
            <div class="card-footer">
              <label for="image" class="custom-file-upload" id="labelImage" tabindex="-1" >
                <i class="material-icons" tabindex="-1">insert_photo</i>
                <input type="file" name="image" accept="image/*" onfocus="focusBtnImg()" onblur="blurBtnImg()" tabindex="0" />
              </label>
            </div>
            <input class="btn btn-default" type="submit" value="Submit">
          </div>
        </div>
        <div class="col-8 col-md-4 col-lg-3">    
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button btn btn-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Paramètres de compte
                </button>
              </h2>
            </div>
            <div id="collapseOne" class="accordion-collapse collapse hide" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <div class="dropdown__content__text">
                  <label for="donlaudPhotoProfile" class="custom-file-upload" id="labelChangeAvatar" tabindex="-1" >
                    <img src="../assets/images/avatar.jpg" width="45" height="45">
                    <input type="file" id="donlaudPhotoProfile" name="image" />
                  </label>
                  <a href="#" tabindex="0">Déconnexion</a>
                  <a href="#" tabindex="0">Supprimer le compte</a>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card-paramsCompt">
      <article class="card">
        <header class="card-header">
          <img src="../assets/images/avatar.jpg" width="45" height="45">
          <div class="card-title">Pseudo users</div>
          <div class="card-date">Il y a 10 Minutes</div>
        </header>
        <div class="card-body">
          <p>
            <img src="../assets/images/image-de-presentation.jpg" class="img-fluid" alt="Responsive image">
          </p>
          <p>
            Découvert petit à petit par le public dans l'émission La Classe en 1991, 
            il interprète plusieurs one-man-shows. En octobre 2000, il devient présentateur du jeu
            télévisé Les Z'amours, sur France 2. Il reste aux commandes du jeu pendant dix-sept ans,
          </p>
        </div>
        <footer class="card-footer">
          <div class="like-dislikes">
            <div class="like-dislikes--likes">
              <i class="material-icons" tabindex="0">thumb_up</i>
              <span class="likes__counter">4</span>
            </div>
            <div class="like-dislikes--dislikes">
              <i class="material-icons" tabindex="0">thumb_down</i>
              <span class="likes__counter">4</span>
            </div>
            <div class="comments">
              <i class="material-icons" tabindex="0">chat_bubble</i>
              <span class="commentsCounter">4</span>
            </div>
          </div>
        </footer>
      </article>
    </div>
  </div>
</template>

<style>

  .header-main {
    padding-bottom: 150px;
  }

  .logo-header {
    height: 80px;
    width: 100vw;
    padding: 20px 0px 20px 0px;
    position: fixed;
    box-shadow: -5px -5px 15px #ffffff, 5px 5px 15px #335080;
    display: flex;
    align-items: center;
  }
  .main-principale {
    padding-top: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  * {
    margin: 0;
    padding: 0;
  }

  .containter-form {
    box-shadow: -5px -5px 15px #d1c3ec, 5px 5px 15px #445f8a;
  }

  .login-page {
    width: 360px;
    padding: 8% 0 0;
    margin: auto;
  }

  .form {
    position: relative;
    z-index: 1;
    background: rgba(0, 0, 0, 0.18);
    max-width: 360px;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  }

  .form input {
    outline: 0;
    background: #700b0b;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }

  .form button {
    text-transform: uppercase;
    outline: 0;
    background: #4CAF50;
    width: 100%;
    border: 0;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
  }

  .form button:hover, .form button:active, .form button:focus {
    background: #43A047;
  }

  .form .message {
    margin: 15px 0 0;
    color: #f3e7e7;
    font-size: 12px;
  }

  .form .message a {
    color: #afeeb1;
    text-decoration: none;
  }

  .form .register-form {
    display: none;
  }

  .like-dislikes {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  .central-meta {
    background: #fdfdfd none repeat scroll 0 0;
    border: 1px solid #ede9e9;
    border-radius: 3px;
    display: inline-block;
    width: 100%;
    margin-bottom: 20px;
    padding: 25px;
  }

  .new-postbox {
    display: inline-block;
    width: 100%;
  }

  .new-postbox > figure {
    display: inline-block;
    margin-bottom: 0;
    vertical-align: top;
    width: 10.4%;
  }

  .newpst-input {
    display: inline-block;
    margin-left: 10px;
    vertical-align: top;
    width: 85.5%;
  }

  .newpst-input > form {
    display: inline-block;
    width: 100%;
  }

  .newpst-input textarea {
    float: left;
    width: 100%;
  }

  .attachments {
    border: 1px solid #eee;
    display: block;
    padding: 10px;
    text-align: right;
    border-top: 0;
    background: #fff;
  }

  .attachments > ul {
    list-style: outside none none;
    margin-bottom: 0;
    padding-left: 0;
  }

  .attachments li {
    display: inline-block;
    margin-left: 5px;
  }

  .clear {
    clear: both;
  }

  body {
    background: linear-gradient(to top, #66a144, #d5f0c6);
    background-size: cover;
    background-attachment: fixed;
  }

  h1 {
    font-size: 3em;
    text-align: center;
    color: #fff;
    font-weight: 100;
    text-transform: capitalize;
    letter-spacing: 4px;
  }

  .main {
    padding: 3em 0 1em;
  }

  .main-agileinfo {
    width: 35%;
    margin: 3em auto;
    background: rgba(0, 0, 0, 0.18);
    background-size: cover;
  }

  .agileits-top {
    padding: 3em;
  }

  input[type=text], input[type=email], input[type=password] {
    font-size: 0.9em;
    color: #fff;
    font-weight: 100;
    width: 94.5%;
    display: block;
    border: none;
    padding: 0.8em;
    border: solid 1px rgba(255, 255, 255, 0.37);
    -webkit-transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
    transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
    background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 96%, #fff 4%);
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 96%, #fff 4%);
    background-position: -800px 0;
    background-size: 100%;
    background-repeat: no-repeat;
    color: #fff;
    font-family: "Roboto", sans-serif;
  }

  input.email, input.text.w3lpass {
    margin: 2em 0;
  }

  ::-webkit-input-placeholder {
    color: #fff;
    font-weight: 100;
  }

  input[type=submit] {
    font-size: 0.9em;
    color: #fff;
    background: #76b852;
    outline: none;
    border: 1px solid #76b852;
    cursor: pointer;
    padding: 0.9em;
    -webkit-appearance: none;
    width: 100%;
    margin: 2em 0;
    letter-spacing: 4px;
  }

  .agileits-top p a {
    color: #fff;
    -webkit-transition: 0.5s all;
    -moz-transition: 0.5s all;
    transition: 0.5s all;
    font-weight: 400;
  }

  @media (max-width: 568px) {
    .main-agileinfo {
      width: 75%;
    }
  }
  @media (max-width: 480px) {
    h1 {
      font-size: 1.8em;
      letter-spacing: 3px;
    }

    .agileits-top {
      padding: 1.8em;
    }

    input[type=text], input[type=email], input[type=password] {
      width: 91%;
    }

    .agileits-top p {
      font-size: 0.9em;
    }
  }
  @media (max-width: 414px) {
    h1 {
      font-size: 1.8em;
      letter-spacing: 2px;
    }

    .main-agileinfo {
      width: 85%;
      margin: 1.5em auto;
    }

    .text:focus, .text:valid {
      background-position: 0 0px;
    }

    .wthree-text ul li, .wthree-text ul li:nth-child(2) {
      display: block;
      float: none;
    }

    .wthree-text ul li:nth-child(2) {
      margin-top: 1.5em;
    }

    input[type=submit] {
      margin: 2em 0 1.5em;
      letter-spacing: 3px;
    }

    input[type=submit] {
      margin: 2em 0 1.5em;
    }

    .colorlibcopy-agile {
      margin: 1em 0 1em;
    }
  }
  @media (max-width: 384px) {
    .main-agileinfo {
      width: 88%;
    }
  }
  @media (max-width: 375px) {
    .agileits-top p {
      letter-spacing: 0px;
    }
  }
  @media (max-width: 320px) {
    .main-w3layouts {
      padding: 1.5em 0 0;
    }

    .agileits-top {
      padding: 1.2em;
    }

    input[type=text], input[type=email], input[type=password] {
      width: 89.5%;
      font-size: 0.85em;
    }

    h1 {
      font-size: 1.7em;
      letter-spacing: 0px;
    }

    .main-agileinfo {
      width: 92%;
      margin: 1em auto;
    }

    .text:focus, .text:valid {
      background-position: 0 0px;
    }

    input[type=submit] {
      margin: 1.5em 0;
      padding: 0.8em;
      font-size: 0.85em;
    }

    .wthree-text label {
      font-size: 0.85em;
    }

    .main-w3layouts {
      padding: 1em 0 0;
    }
  }

</style>