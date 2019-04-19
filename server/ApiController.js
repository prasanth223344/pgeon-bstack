
const express = require('express');
const request = require('request-promise');
const { decorateApp } = require('@awaitjs/express');
const { COLLECTION } = require('radiks-server/app/lib/constants');



const makeApiController = (db) => {
  const Router = decorateApp(express.Router());
  const radiksData = db.collection(COLLECTION);

  // Router.getAsync('/messages', async (req, res) => {
  //   let messages = await aggregateMessages(radiksData, req.query);

  //   let username = req.query.fetcher || req.universalCookies.get('username');
  //   if (username) username = username.replace(/"/g, '');
  //   messages = transformMessageVotes(messages, username);

  //   res.json({ messages });
  // });








  Router.getAsync('/profileqa/:id', async (req, res) => {

    const results = await radiksData
      .find(
        {
          
          radiksType: 'Question',
          expiring_at: { $lt: Date.now()  },
          accepted_answer:  { $exists: true},
          $or: [ { user_id: req.params.id }, { accepted_user: req.params.id } ],

        },
        {
          projection: { question: 1, _id:1, accepted_answer:1, accepted_user:1, user_id:1 },
        }
      )
      .toArray();


   
    //const usernames = users.map(({ username }) => username && username);
    res.json(results);
  });



  Router.getAsync('/search/:exclude/:startswith', async (req, res) => {

    const results = await radiksData
      .find(
        {
          radiksType: 'BlockstackUser',
          username: {'$regex' : '.*'+req.params.startswith+'.*' , '$options' : 'i' },
          _id: {'$ne': req.params.exclude }

        },
        {
          projection: { username: 1, _id:1 },
        }
      )
      .toArray();


   
    //const usernames = users.map(({ username }) => username && username);
    res.json(results);
  });






  Router.deleteAsync('/answer/:id', async (req, res) => {

     await radiksData.remove(
      { radiksType: 'Vote',
        answer_id: req.params.id
      }
      )

      await radiksData.remove(
        { radiksType: 'Answer',
          _id: req.params.id
        }
      )

    res.send('success');
  })


  Router.deleteAsync('/question/:id', async (req, res) => {

     await radiksData.remove(
      { radiksType: 'Question',
        _id: req.params.id
      }
      )

     await radiksData.remove(
      { radiksType: 'Vote',
        question_id: req.params.id
      }
      )

      await radiksData.remove(
        { radiksType: 'Answer',
        question_id: req.params.id
        }
      )

    res.send('success');
  })







 Router.deleteAsync('/question-multiple/:ids', async (req, res) => {

   
  await radiksData.deleteMany(
   { radiksType: 'Question',
     _id: { "$in": [req.params.ids.split(",")]}
   }
   )

  await radiksData.deleteMany(
   { radiksType: 'Vote',
     question_id: { "$in": [req.params.ids.split(",")]}
   }
   )

   await radiksData.deleteMany(
     { radiksType: 'Answer',
     question_id: { "$in": [req.params.ids.split(",")]}
     }
   )
     
   res.send('success');
})







Router.postAsync('/reportq/:question/:username', async (req, res) => {

  const SparkPost = require('sparkpost');

  console.log(process.env.SPARKPOST_KEY);
  
const client = new SparkPost(process.env.SPARKPOST_KEY);

client.transmissions.send({
    
    content: {
      from: 'support.pgeon@heartboxx.com',
      subject: 'Hello, World!',
      html:`
      <!doctype html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <title>Alert - Reported live question</title>
          <style media="all" type="text/css">
     
      img {
        border: none;
        -ms-interpolation-mode: bicubic;
        max-width: 100%; }
      
      .img-block {
        display: block; }
      
      body {
        font-family: sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size: 14px;
        line-height: 1.4;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%; }
      
      table {
        border-collapse: separate;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        width: 100%; }
        table td {
          font-family: sans-serif;
          font-size: 14px;
          vertical-align: top; }
      
     
      body {
        background-color: #f6f6f6;
        margin: 0;
        padding: 0; }
      
      .body {
        background-color: #f4f5f6;
        width: 100%; }
      
      /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
      .container {
        Margin: 0 auto !important;
        /* makes it centered */
        max-width: 580px;
        padding: 10px;
        width: auto !important;
        width: 580px; }
      
      /* This should also be a block element, so that it will fill 100% of the .container */
      .content {
        box-sizing: border-box;
        display: block;
        Margin: 0 auto;
        max-width: 580px;
        padding: 10px; }
      
      
      .main {
        background: #fff;
        border-radius: 3px;
        width: 100%; }
      
      .wrapper {
        box-sizing: border-box;
        padding: 20px; }
      
      .content-block {
        padding-top: 10px;
        padding-bottom: 10px; }
      
      .flush-top {
        margin-top: 0;
        padding-top: 0; }
      
      .flush-bottom {
        margin-bottom: 0;
        padding-bottom: 0; }
      
      .header {
        margin-bottom: 20px;
        Margin-top: 10px;
        width: 100%; }
        .header > table {
          min-width: 100%; }
      
      .footer {
        clear: both;
        padding-top: 10px;
        text-align: center;
        width: 100%; }
        .footer td,
        .footer p,
        .footer span,
        .footer a {
          color: #999999;
          font-size: 12px;
          text-align: center; }
      
     
      .section-callout {
        background-color: #1abc9c;
        color: #ffffff; }
        .section-callout h1,
        .section-callout h2,
        .section-callout h3,
        .section-callout h4,
        .section-callout p,
        .section-callout li,
        .section-callout td {
          color: #ffffff; }
      
      .section-callout-subtle {
        background-color: #f7f7f7;
        border-bottom: 1px solid #e9e9e9;
        border-top: 1px solid #e9e9e9; }
      
     
      .span-2,
      .span-3 {
        display: inline-block;
        Margin-bottom: 40px;
        vertical-align: top;
        width: 100%; }
        .span-2 > table,
        .span-3 > table {
          padding-left: 20px;
          padding-right: 20px; }
      
      .span-3 {
        max-width: 278px; }
        .span-3 > table {
          max-width: 278px; }
      
      .span-2 {
        max-width: 184px; }
        .span-2 > table {
          max-width: 184px; }
      
     
      @media only screen and (max-width: 620px) {
        .span-2,
        .span-3 {
          max-width: none !important;
          width: 100% !important; }
          .span-2 > table,
          .span-3 > table {
            max-width: 100% !important;
            width: 100% !important; } }
      
     
      
      
      
      p,
      ul,
      ol {
        font-family: sans-serif;
        font-size: 14px;
        font-weight: normal;
        Margin: 0;
        Margin-bottom: 15px; }
        p li,
        ul li,
        ol li {
          list-style-position: outside;
          Margin-left: 15px;
          padding: 0;
          text-indent: 0; }
      
      ul,
      ol {
        Margin-left: 5px;
        padding: 0;
        text-indent: 0; }
      
      a {
        color: #3498db;
        text-decoration: underline; }
      
      /* -------------------------------------
          BUTTONS
      ------------------------------------- */
      .btn {
        box-sizing: border-box;
        min-width: 100% !important;
        width: 100%; }
        .btn > tbody > tr > td {
          padding-bottom: 15px; }
        .btn table {
          width: auto; }
        .btn table td {
          background-color: #ffffff;
          border-radius: 5px;
          text-align: center; }
        .btn a {
          background-color: #ffffff;
          border: solid 1px #24c4bc;
          border-radius: 4px;
          box-sizing: border-box;
          color: #3498db;
          cursor: pointer;
          display: inline-block;
          font-size: 14px;
          font-weight: bold;
          margin: 0;
          padding: 12px 25px;
          text-decoration: none;
          text-transform: capitalize; }
      
      .btn-primary table td {
        background-color: #3498db; }
      
      .btn-primary a {
        background-color: #24c4bc;
        border-color: #24c4bc;
        color: #ffffff; }
      
      @media all {
        .btn-primary table td:hover {
          background-color: #00b2a4 !important; }
        .btn-primary a:hover {
          background-color: #00b2a4 !important;
          border-color: #00b2a4 !important; } }
      
      .btn-secondary table td {
        background-color: transparent; }
      
      .btn-secondary a {
        background-color: transparent;
        border-color: #3498db;
        border-width: 2px;
        color: #3498db; }
      
      @media all {
        .btn-secondary a:hover {
          border-color: #34495e !important;
          color: #34495e !important; } }
      
      .btn-tertiary table td {
        background-color: transparent; }
      
      .btn-tertiary a {
        background-color: transparent;
        border-color: #ffffff;
        border-width: 2px;
        color: #ffffff; }
      
      /* -------------------------------------
          ALERTS
      ------------------------------------- */
      .alert {
        min-width: 100%; }
        .alert td {
          border-radius: 3px 3px 0 0;
          color: #ffffff;
          font-size: 16px;
          font-weight: 500;
          padding: 20px;
          text-align: center; }
        .alert a {
          color: #ffffff;
          font-size: 16px;
          font-weight: 500;
          text-decoration: none; }
        .alert.alert-warning td {
          background-color: #f39c12; }
        .alert.alert-danger td {
          background-color: #c0392b; }
        .alert.alert-success td {
          background-color: #27ae60; }
      
      /* -------------------------------------
          RECEIPT
      ------------------------------------- */
      .receipt {
        Margin-bottom: 20px;
        width: 100%; }
        .receipt td {
          border-bottom: 1px solid #eee;
          margin: 0;
          padding: 5px; }
          .receipt td.receipt-figure {
            text-align: right; }
        .receipt .receipt-subtle {
          color: #aaa; }
        .receipt .receipt-bold td {
          border-bottom: 2px solid #333;
          border-top: 2px solid #333;
          font-size: 18px;
          font-weight: 600; }
      
      .receipt-container {
        width: 80%; }
      
      /* -------------------------------------
          FEATURES
      ------------------------------------- */
      .article .article-thumbnail {
        padding-bottom: 5px; }
      
      .article .article-title {
        font-size: 18.2px;
        font-weight: 800;
        line-height: 1.4em;
        padding-bottom: 5px; }
        .article .article-title a {
          color: #222222;
          font-size: 18.2px;
          font-weight: 800;
          line-height: 1.4em;
          text-decoration: none; }
      
      /* -------------------------------------
          SOCIAL SHARING
      ------------------------------------- */
      .social-sharing {
        Margin: 0 auto;
        text-align: center;
        width: auto; }
      
      .social-sharing-icon {
        height: 44px;
        Margin: 0 2px; }
      
      .social-sharing-url {
        Margin: 0 auto 20px;
        width: 100%; }
        .social-sharing-url td {
          background: rgba(255, 255, 255, 0.2);
          border: 2px dashed #ffffff;
          color: #ffffff;
          font-size: 18px;
          font-weight: 600;
          padding: 10px;
          text-align: center; }
      
      .social-sharing-url-container {
        width: 300px; }
      
      /* -------------------------------------
          OTHER STYLES THAT MIGHT BE USEFUL
      ------------------------------------- */
      .last {
        margin-bottom: 0; }
      
      .first {
        margin-top: 0; }
      
      .align-center {
        text-align: center; }
      
      .align-right {
        text-align: right; }
      
      .align-left {
        text-align: left; }
      
      .clear {
        clear: both; }
      
      .mt0 {
        margin-top: 0; }
      
      .mb0 {
        margin-bottom: 0; }
      
      .preheader {
        color: transparent;
        display: none;
        height: 0;
        max-height: 0;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
        mso-hide: all;
        visibility: hidden;
        width: 0; }
      
      .powered-by a {
        text-decoration: none; }
      
      hr {
        border: 0;
        border-bottom: 1px solid #f6f6f6;
        Margin: 20px 0; }
      
      /* -------------------------------------
          RESPONSIVE AND MOBILE FRIENDLY STYLES
      ------------------------------------- */
      
        h3 {
          font-size: 16px !important;
          margin-bottom: 10px !important; }
        p,
        ul,
        ol,
        td,
        span,
        a {
          font-size: 16px !important; }
        .wrapper,
        .article {
          padding: 10px !important; }
        .content {
          padding: 0 !important; }
        .container {
          padding: 0 !important;
          width: 100% !important; }
        .header {
          margin-bottom: 10px !important; }
        .main {
          border-left-width: 0 !important;
          border-radius: 0 !important;
          border-right-width: 0 !important; }
        .btn table {
          width: 100% !important; }
        .btn a {
          width: 100% !important; }
        .img-responsive {
          height: auto !important;
          max-width: 100% !important;
          width: auto !important; }
        .alert td {
          border-radius: 0 !important;
          padding: 10px !important; }
        .receipt {
          width: 100% !important; } 
      
      /* -------------------------------------
          PRESERVE THESE STYLES IN THE HEAD
      ------------------------------------- */
      @media all {
        .ExternalClass {
          width: 100%; }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
          line-height: 100%; }
        .apple-link a {
          color: inherit !important;
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          </style>
      
          <!--[if gte mso 9]>
          <xml>
       <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
       </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
        </head>
        <body class="" style="font-family: 'Open Sans', sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f6f6f6; margin: 0; padding: 0;">
      
      
      
        <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;" width="100%" bgcolor="#f6f6f6">
        <tr>
          <td style="font-family: 'Open Sans', sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
          <td class="container" style="font-family: 'Open Sans', sans-serif; font-size: 14px; vertical-align: top; Margin: 0 auto !important; max-width: 580px; padding: 10px; width: 580px;" width="580" valign="top">
            <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
  
              <!-- START CENTERED WHITE CONTAINER -->
              <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;"></span>
  
              <!-- START HEADER -->
              <div class="header" style="margin-bottom: 20px; Margin-top: 10px; width: 100%;">
                <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; min-width: 100%;" width="100%">
                </table>
              </div>
  
              <!-- END HEADER -->
              <table border="0" cellpadding="0" cellspacing="0" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #fff; border-radius: 3px;" width="100%">
  
                <!-- START NOTIFICATION BANNER -->
                <tr>
                  <td style="font-family: 'Open Sans', sans-serif; font-size: 14px; vertical-align: top;" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="alert alert-warning" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; min-width: 100%;" width="100%">
                      <tr>
                        <td align="center" style="font-family: 'Open Sans', sans-serif; vertical-align: top; font-size: 16px; border-radius: 3px 3px 0 0; color: #ffffff; font-weight: 500; padding: 20px; text-align: center; background-color: #f39c12;" valign="top" bgcolor="#f39c12"> Someone has reported a live question</td>
                      </tr>
                    </table>
                  </td>
                </tr>
  
                <!-- END NOTIFICATION BANNER -->
  
  <!-- START MAIN CONTENT AREA --><tr>
                  <td class="wrapper" style="font-family: 'Open Sans', sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                      <tr>
                        <td style="font-family: 'Open Sans', sans-serif; font-size: 14px; vertical-align: top;" valign="top">
                          <p style="font-family: 'Open Sans', sans-serif; font-size: 14px; font-weight: normal; Margin: 0; Margin-bottom: 15px;">Hello Pgeon staff member,</p>
                          <p style="font-family: 'Open Sans', sans-serif; font-size: 14px; font-weight: normal; Margin: 0; Margin-bottom: 15px;">This user: <a href="$user_slug">$user_slug</a></p>
                          <p style="font-family: 'Open Sans', sans-serif; font-size: 14px; font-weight: normal; Margin: 0; Margin-bottom: 15px;">Reported this live question: <a href="$q_url">$q_url</a></p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
  
                <!-- END MAIN CONTENT AREA -->
                </table>
  
  <!-- END CENTERED WHITE CONTAINER --></div>
          </td>
          <td style="font-family: 'Open Sans', sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
        </tr>
      </table>
    
      
      
              </body>
              </html>
              
              
      
              `
    },
    recipients: [
      {address: 'rameshkumar86@gmail.com'}
    ]
  })
  .then(data => {
    console.log('Woohoo! You just sent your first mailing!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });


})

  // Router.getAsync('/user/:username', async (req, res) => {
  //   const { username } = req.params;
  //   let user = await radiksData.findOne({
  //     radiksType: 'BlockstackUser',
  //     username,
  //   });

  //   if (!user) {
  //     const uri = `https://core.blockstack.org/v1/users/${username}`;
  //     try {
  //       const userData = await request({
  //         uri,
  //         json: true,
  //       });
  //       if (userData[username] && !userData[username].error) {
  //         user = {
  //           username,
  //           profile: userData[username].profile,
  //         };
  //       }
  //     } catch (error) {
  //       // user not found
  //     }
  //   }

  //   res.json({ attrs: user });
  // });




  return Router;
};

module.exports = makeApiController;
