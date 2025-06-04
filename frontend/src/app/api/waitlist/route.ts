import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../db/index";
import { usersTable } from "../../../db/schema";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL as string,
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
                        <html lang="en">
                        <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>ActiveWave - You've joined the waitlist!</title>
                        <link rel="preconnect" href="https://fonts.googleapis.com">
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
                        <style>
                            /* Reset CSS */
                            *, *::before, *::after {
                            box-sizing: border-box;
                            margin: 0;
                            padding: 0;
                            }

                            html {
                            font-size: 16px;
                            -webkit-text-size-adjust: 100%;
                            }

                            body {
                            margin: 0;
                            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                            line-height: 1.5;
                            -webkit-font-smoothing: antialiased;
                            -moz-osx-font-smoothing: grayscale;
                            }

                            img {
                            max-width: 100%;
                            height: auto;
                            display: block;
                            }

                            a {
                            text-decoration: none;
                            color: inherit;
                            }

                            button, input, optgroup, select, textarea {
                            font-family: inherit;
                            font-size: 100%;
                            line-height: 1.15;
                            margin: 0;
                            }

                            /* Main Styles */
                            :root {
                            --color-background: #000000;
                            --color-text-primary: #ffffff;
                            --color-text-secondary: rgba(255, 255, 255, 0.8);
                            --color-accent: #FF5500;
                            --color-accent-light: #FF7A33;
                            --color-divider: rgba(255, 255, 255, 0.2);
                            --spacing-xs: 0.5rem;
                            --spacing-sm: 1rem;
                            --spacing-md: 1.5rem;
                            --spacing-lg: 2rem;
                            --spacing-xl: 3rem;
                            --border-radius: 0.25rem;
                            }

                            body {
                            background-color: #f4f4f4;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            min-height: 100vh;
                            padding: var(--spacing-md);
                            }

                            .email-container {
                            max-width: 600px;
                            width: 100%;
                            background-color: var(--color-background);
                            color: var(--color-text-primary);
                            border-radius: var(--border-radius);
                            overflow: hidden;
                            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                            margin: 0 auto;
                            }

                            .email-header {
                            padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-md);
                            }

                            .logo-container {
                            display: flex;
                            justify-content: center;
                            margin-bottom: var(--spacing-md);
                            }

                            .logo {
                            height: 40px;
                            width: auto;
                            }

                            .header-divider {
                            height: 1px;
                            background-color: var(--color-divider);
                            margin: var(--spacing-sm) 0;
                            }

                            .email-body {
                            padding: 0 var(--spacing-lg) var(--spacing-lg);
                            }

                            .waitlist-heading {
                            color: var(--color-accent);
                            font-size: 1.8rem;
                            font-weight: 700;
                            margin-bottom: var(--spacing-lg);
                            line-height: 1.2;
                            }

                            .product-image-container {
                            background-color: var(--color-accent);
                            border-radius: var(--border-radius);
                            overflow: hidden;
                            margin-bottom: var(--spacing-lg);
                            transition: transform 0.3s ease;
                            }

                            .product-image-container:hover {
                            transform: scale(1.02);
                            }

                            .product-image {
                            width: 100%;
                            height: auto;
                            object-fit: cover;
                            }

                            .confirmation-message {
                            color: var(--color-text-secondary);
                            font-size: 1rem;
                            line-height: 1.5;
                            }

                            .confirmation-message p {
                            margin-bottom: var(--spacing-md);
                            }

                            .email-link {
                            color: var(--color-accent);
                            text-decoration: underline;
                            transition: color 0.2s ease;
                            }

                            .email-link:hover {
                            color: var(--color-accent-light);
                            }

                            .signature {
                            margin-top: var(--spacing-lg);
                            }

                            .email-footer {
                            padding: var(--spacing-md) var(--spacing-lg) var(--spacing-lg);
                            }

                            .footer-divider {
                            height: 1px;
                            background-color: var(--color-divider);
                            margin-bottom: var(--spacing-lg);
                            }

                            .social-links {
                            display: flex;
                            justify-content: center;
                            gap: var(--spacing-md);
                            margin-bottom: var(--spacing-lg);
                            }

                            .social-icon {
                            width: 24px;
                            height: 24px;
                            opacity: 0.8;
                            transition: opacity 0.2s ease, transform 0.2s ease;
                            }

                            .social-icon:hover {
                            opacity: 1;
                            transform: translateY(-2px);
                            }

                            .company-info {
                            font-size: 0.8rem;
                            color: var(--color-text-secondary);
                            text-align: center;
                            margin-bottom: var(--spacing-md);
                            }

                            .footer-links {
                            display: flex;
                            justify-content: center;
                            flex-wrap: wrap;
                            gap: var(--spacing-xs);
                            font-size: 0.75rem;
                            color: var(--color-text-secondary);
                            }

                            .footer-link {
                            transition: color 0.2s ease;
                            }

                            .footer-link:hover {
                            color: var(--color-text-primary);
                            }

                            .footer-separator {
                            color: var(--color-divider);
                            }

                            @media (max-width: 480px) {
                            .email-container {
                                border-radius: 0;
                            }

                            .email-header, .email-body, .email-footer {
                                padding-left: var(--spacing-md);
                                padding-right: var(--spacing-md);
                            }

                            .waitlist-heading {
                                font-size: 1.5rem;
                            }

                            .footer-links {
                                flex-direction: column;
                                align-items: center;
                                gap: var(--spacing-sm);
                            }

                            .footer-separator {
                                display: none;
                            }
                            }
                        </style>
                        </head>
                        <body>
                        <div class="email-container">
                            <header class="email-header">
                            <div class="logo-container">
                                <img src="https://s3.tebi.io/gitfund/gitfund-white.webp" alt="GITFUND Logo" class="logo">
                            </div>
                            <div class="header-divider"></div>
                            </header>

                            <main class="email-body">
                            <h1 class="waitlist-heading">You've successfully joined the Waitlist!</h1>

                            <div class="product-image-container">
                                <img src="https://s3.tebi.io/gitfund/signup%20%281%29.jpg" alt="Horizon Hauler Hiking Bag" class="product-image">
                            </div>

                            <div class="confirmation-message">

                                <p>Thank you for being so interested in the GitFund. You have been successfully added to our waitlist!</p>

                                <p>We will let you know as soon as the product becomes available. If you have any questions, please feel free to contact our customer service team at <a href="mailto:support@gitfund.tech" class="email-link">support@gitfund.tech</a>.</p>

                                <p>Thank you for your patience and support!</p>

                                <p class="signature">Warm regards,<br>The GitFund Team</p>
                            </div>
                            </main>

                            <footer class="email-footer">
                            <div class="footer-divider"></div>

                            <div class="social-links">
                                <a href="https://x.com/GITFUND2025" class="social-icon"><img src="data:image/png;base64,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vpdDjgd8hNxFBr34xOG82T+vJhlx+G4mYAIm0BkCdgA6Y6p0itY5C+4BYMFPbCnEqsKyc/xbXBv/P+d2A4A4aDfzua7+/VoAV8886EnGA9/NBEzABIoiYAegKHPmN5g6HXKcS5jrs+Qc/z9WG2b+/+x/j/8fe+rxNv7vWZ9B//2POR7wfyT52/xoWSMTMAETaI+AHYD2WFuSCZiACZiACWRDwA5ANqawIiZgAiZgAibQHgE7AO2xtiQTMAETMAETyIaAHYBsTGFFTMAETMAETKA9AnYA2mNtSSZgAiZgAiaQDQE7ANmYwoqYgAmYgAmYQHsE7AC0x9qSTMAETMAETCAbAnYAsjGFFTEBEzABEzCB9gjYAWiPtSWZgAmYgAmYQDYE7ABkYworYgImYAImYALtEbAD0B5rSzIBEzABEzCBbAjYAcjGFFbEBEzABEzABNojYAegPdaWZAImYAImYALZELADkI0prIgJmIAJmIAJtEfADkB7rC3JBEzABEzABLIhYAcgG1NYERMwARMwARNoj4AdgPZYW5IJmIAJmIAJZEPADkA2prAiJmACJmACJtAeATsA7bG2JBMwARMwARPIhoAdgGxMYUVMwARMwARMoD0CdgDaY21JJmACJmACJpANATsA2ZjCipiACZiACZhAewTsALTH2pJMwARMwARMIBsCdgCyMYUVMQETMAETMIH2CNgBaI+1JZmACZiACZhANgTsAGRjCitiAiZgAiZgAu0RsAPQHmtLMgETMAETMIFsCNgByMYUVsQETMAETMAE2iNgB6A91pZkAiZgAiZgAtkQsAOQjSmsiAmYgAmYgAm0R8AOQHusLckETMAETMAEsiFgByAbU1gREzABEzABE2iPgB2A9lhbkgmYgAmYgAlkQ8AOQDamsCImYAImYAIm0B4BOwDtsbYkEzABEzABE8iGgB2AbExhRUzABEzABEygPQJ2ANpjbUkmYAImYAImkA0BOwDZmMKKmIAJmIAJmEB7BOwAtMfakkzABEzABEwgGwJ2ALIxhRUxARMwARMwgfYI2AFoj7UlmYAJmIAJmEA2BOwAZGMKK2ICJmACJmAC7RGwA9Aea0syARMwARMwgWwI2AHIxhRWxARMwARMwATaI2AHoD3WlmQCJmACJmAC2RCwA5CNKayICZiACZiACbRHwA5Ae6wtyQRMwARMwASyIWAHIBtTWBETMAETMAETaI+AHYD2WFuSCZiACZiACWRDwA5ANqawIiZgAiZgAibQHgE7AO2xtiQTMAETMAETyIaAHYBsTGFFTMAETMAETKA9AnYA2mNtSSZgAiZgAiaQDQE7ANmYwoqYgAmYgAmYQHsE7AC0x9qSTMAETMAETCAbAnYAsjGFFTEBEzABEzCB9gjYAWiPtSWZgAmYgAmYQDYE7ABkYworYgImYAImYALtEbAD0B5rSzIBEzABEzCBbAjYAcjGFFbEBEzABEzABNojYAegPdaWZAImYAImYALZELADkI0prIgJmIAJmIAJtEfADkB7rC3JBEzABEzABLIhYAcgG1NYERMwARMwARNoj4AdgPZYW5IJmIAJmIAJZEPADkA2prAiJmACJmACJtAeATsA7bG2JBMwARMwARPIhoAdgGxMYUVMwARMwARMoD0CdgDaY21JJmACJmACJpANgf8HgzLnHsscSlIAAAAASUVORK5CYII=" alt="Twitter"></a>
                                <a href="https://www.linkedin.com/company/quarlatis" class="social-icon"><img src="data:image/png;base64,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" alt="LinkedIn"></a>
                            </div>

                            <div class="company-info">
                                <p>&copy; 2025 GitFund</p>
                            </div>

                            </footer>
                        </div>
                        </body>
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
