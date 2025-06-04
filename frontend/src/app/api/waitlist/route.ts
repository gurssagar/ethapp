import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../db/index";
import { usersTable } from "../../../db/schema";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "mail.gdggtbit.in",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL as string,
    pass: process.env.EMAIL_PASS as string,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    // First insert the project
    await db.insert(usersTable).values({
      email: email,
    });

    // Then send email notification
    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL as string,
        to: email,
        subject: "Thanks for Joining the Waitlist",
        html: `

        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
        <head>
        <title></title>
        <meta charset="UTF-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <!--[if !mso]>-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <meta name="x-apple-disable-message-reformatting" content="" />
        <meta content="target-densitydpi=device-dpi" name="viewport" />
        <meta content="true" name="HandheldFriendly" />
        <meta content="width=device-width" name="viewport" />
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
        <style type="text/css">
        table {
        border-collapse: separate;
        table-layout: fixed;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt
        }
        table td {
        border-collapse: collapse
        }
        .ExternalClass {
        width: 100%
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
        line-height: 100%
        }
        body, a, li, p, h1, h2, h3 {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        }
        html {
        -webkit-text-size-adjust: none !important
        }
        body, #innerTable {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale
        }
        #innerTable img+div {
        display: none;
        display: none !important
        }
        img {
        Margin: 0;
        padding: 0;
        -ms-interpolation-mode: bicubic
        }
        h1, h2, h3, p, a {
        line-height: inherit;
        overflow-wrap: normal;
        white-space: normal;
        word-break: break-word
        }
        a {
        text-decoration: none
        }
        h1, h2, h3, p {
        min-width: 100%!important;
        width: 100%!important;
        max-width: 100%!important;
        display: inline-block!important;
        border: 0;
        padding: 0;
        margin: 0
        }
        a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important
        }
        u + #body a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
        }
        a[href^="mailto"],
        a[href^="tel"],
        a[href^="sms"] {
        color: inherit;
        text-decoration: none
        }
        </style>
        <style type="text/css">
        @media (min-width: 481px) {
        .hd { display: none!important }
        }
        </style>
        <style type="text/css">
        @media (max-width: 480px) {
        .hm { display: none!important }
        }
        </style>
        <style type="text/css">
        @media (max-width: 480px) {
        .t40,.t44{vertical-align:middle!important}.t58,.t63{mso-line-height-alt:0px!important;line-height:0!important;display:none!important}.t59{padding-top:43px!important;border:0!important;border-radius:0!important}.t6{line-height:28px!important;font-size:24px!important;mso-text-raise:1px!important}.t45{text-align:center!important}.t38{display:revert!important}.t40{width:58px!important}.t44{width:30px!important}
        }
        </style>
        <!--[if !mso]>-->
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600&amp;display=swap" rel="stylesheet" type="text/css" />
        <!--<![endif]-->
        <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        </head>
        <body id="body" class="t66" style="min-width:100%;Margin:0px;padding:0px;background-color:#F9F9F9;"><div class="t65" style="background-color:#F9F9F9;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t64" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#F9F9F9;background-image:none;background-repeat:repeat;background-size:auto;background-position:center top;" valign="top" align="center">
        <!--[if mso]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
        <v:fill color="#F9F9F9"/>
        </v:background>
        <![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td><div class="t58" style="mso-line-height-rule:exactly;mso-line-height-alt:70px;line-height:70px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t62" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="614" class="t61" style="width:614px;">
        <table class="t60" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t59" style="border:1px solid #CECECE;overflow:hidden;background-color:#000000;padding:50px 40px 40px 40px;border-radius:20px 20px 20px 20px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="center">
        <table class="t4" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="200" class="t3" style="width:200px;">
        <table class="t2" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t1"><a href="#" style="font-size:0px;" target="_blank"><img class="t0" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="200" height="67.40858505564388" alt="" src="https://a9cf5754-446f-4774-b9d9-6dc431164e71.b-cdn.net/e/bad55b67-0b8e-4fa2-b72a-c2ba59fcf2e6/7df9ba8f-a0f9-4f68-ac0c-f6250280f0a3.png"/></a></td></tr></table>
        </td></tr></table>
        </td></tr><tr><td><div class="t5" style="mso-line-height-rule:exactly;mso-line-height-alt:23px;line-height:23px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t10" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="339" class="t9" style="width:339px;">
        <table class="t8" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t7"><h1 class="t6" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:40px;font-weight:600;font-style:normal;font-size:40px;text-decoration:none;text-transform:none;letter-spacing:-1.2px;direction:ltr;color:#D4FF00;text-align:left;mso-line-height-rule:exactly;">Thanks for Joining the Waitlist</h1></td></tr></table>
        </td></tr></table>
        </td></tr><tr><td><div class="t11" style="mso-line-height-rule:exactly;mso-line-height-alt:23px;line-height:23px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t16" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="376" class="t15" style="width:376px;">
        <table class="t14" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t13"><div style="font-size:0px;"><img class="t12" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="376" height="376" alt="" src="https://a9cf5754-446f-4774-b9d9-6dc431164e71.b-cdn.net/e/bad55b67-0b8e-4fa2-b72a-c2ba59fcf2e6/2914638e-d5aa-4826-a385-b320ce2a84c3.jpeg"/></div></td></tr></table>
        </td></tr></table>
        </td></tr><tr><td><div class="t18" style="mso-line-height-rule:exactly;mso-line-height-alt:17px;line-height:17px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t22" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="382" class="t21" style="width:382px;">
        <table class="t20" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t19"><p class="t17" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:15px;text-decoration:none;text-transform:none;letter-spacing:-0.6px;direction:ltr;color:#CECECE;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">Thank you for being so interested in the GitFund. You have been successfully added to our waitlist!&nbsp; We will let you know as soon as the product becomes available.</p></td></tr></table>
        </td></tr></table>
        </td></tr><tr><td><div class="t24" style="mso-line-height-rule:exactly;mso-line-height-alt:17px;line-height:17px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t28" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="376" class="t27" style="width:376px;">
        <table class="t26" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t25"><p class="t23" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:15px;text-decoration:none;text-transform:none;letter-spacing:-0.6px;direction:ltr;color:#CECECE;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">&nbsp;If you have any questions, please feel free to contact our customer service team at support@gitfund.tech.&nbsp;&nbsp;</p></td></tr></table>
        </td></tr></table>
        </td></tr><tr><td><div class="t30" style="mso-line-height-rule:exactly;mso-line-height-alt:17px;line-height:17px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t34" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="308" class="t33" style="width:308px;">
        <table class="t32" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t31"><p class="t29" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:15px;text-decoration:none;text-transform:none;letter-spacing:-0.6px;direction:ltr;color:#F9F9F9;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">Thank you for your patience and support!&nbsp; Warm regards, The GitFund Team</p></td></tr></table>
        </td></tr></table>
        </td></tr><tr><td><div class="t35" style="mso-line-height-rule:exactly;mso-line-height-alt:38px;line-height:38px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t57" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="532" class="t56" style="width:600px;">
        <table class="t55" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t54" style="border-top:1px solid #333333;padding:15px 0 15px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="center">
        <table class="t52" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="264" class="t51" style="width:264px;">
        <table class="t50" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t49"><div class="t48" style="width:100%;text-align:center;"><div class="t47" style="display:inline-block;"><table class="t46" role="presentation" cellpadding="0" cellspacing="0" align="center" valign="middle">
        <tr class="t45"><td></td><td class="t40" width="58" valign="middle">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t39" style="width:100%;"><tr><td class="t37" style="padding:5px 0 5px 0;"><a href="https://www.linkedin.com/company/quarlatis" style="font-size:0px;" target="_blank"><img class="t36" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="30" height="30" alt="" src="https://a9cf5754-446f-4774-b9d9-6dc431164e71.b-cdn.net/e/bad55b67-0b8e-4fa2-b72a-c2ba59fcf2e6/b6863b62-3600-4d52-8088-43931aa0dae8.png"/></a></td><td class="t38" style="width:28px;" width="28"></td></tr></table>
        </td><td class="t44" width="30" valign="middle">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t43" style="width:100%;"><tr><td class="t42"><a href="x.com/GITFUND2025" style="font-size:0px;" target="_blank"><img class="t41" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="30" height="30" alt="" src="https://a9cf5754-446f-4774-b9d9-6dc431164e71.b-cdn.net/e/bad55b67-0b8e-4fa2-b72a-c2ba59fcf2e6/ed613ab4-6579-4c53-be56-ff9a7676857d.png"/></a></td></tr></table>
        </td>
        <td></td></tr>
        </table></div></div></td></tr></table>
        </td></tr></table>
        </td></tr><tr><td><div class="t53" style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr></table></td></tr></table>
        </td></tr></table>
        </td></tr></table></td></tr></table>
        </td></tr></table>
        </td></tr><tr><td><div class="t63" style="mso-line-height-rule:exactly;mso-line-height-alt:70px;line-height:70px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr></table></td></tr></table></div><div class="gmail-fix" style="display: none; white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div></body>
        </html>
                `,
      });

      return NextResponse.json({
        success: true,
        emailSent: info.accepted.length > 0,
        messageId: info.messageId,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Return success true because project was created even if email failed
      return NextResponse.json({
        success: true,
        emailSent: false,
        error: "Project created but notification email failed",
      });
    }
  } catch (error) {
    console.error("Error in project creation:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
export async function GET() {
  // Logic for handling GET requests
  // For example, fetching and returning waitlist entries
  return NextResponse.json({
    message: "This is a GET request to save-waitlist",
  });
}
