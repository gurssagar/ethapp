import { NextResponse } from 'next/server';
import { db } from '../../db/index';
import { usersTable } from '../../db/schema';
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    host: "mail.gdggtbit.in",
    port: 587,
    secure: false,
    auth: {
        user: 'gitfund@gdggtbit.in',
        pass: 'SagarTanav2003#@'
    }
});

export async function POST(request: Request) {
    try {
        const { email} = await request.json();
        // First insert the project
        await db.insert(usersTable).values({
            email:email
        });

        // Then send email notification
        try {
            const info = await transporter.sendMail({
                from: 'gitfund@gdggtbit.in',
                to: email,
                subject: 'Thanks for Joining the Waitlist',
                html: `
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Welcome to GitFund</title>
                    </head>
                    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f3f4f6;">
                            <tr>
                                <td align="center" style="padding: 48px 24px;">
                                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                                        <!-- Header -->
                                        <tr>
                                            <td style="background: linear-gradient(to right, #2563eb, #1d4ed8); padding: 24px 32px;">
                                                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                                    <tr>
                                                        <td>
                                                            <h1 style="color: white; font-size: 24px; font-weight: bold; margin: 0;">GitFund</h1>
                                                            <p style="color: #bfdbfe; margin: 8px 0 0; font-weight: 500;">Connecting Open Source with Web3</p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>

                                        <!-- Content -->
                                        <tr>
                                            <td style="padding: 40px 32px;">
                                                <h2 style="font-size: 30px; font-weight: bold; color: #1f2937; margin: 0 0 24px;">Welcome to the Future of Open Source!</h2>
                                                
                                                <p style="color: #4b5563; line-height: 1.6; margin: 0 0 24px;">
                                                    Thank you for joining the GitFund waitlist! We're building a revolutionary Web3 platform that connects open-source maintainers with contributors through crypto-powered bounties on GitHub issues.
                                                </p>

                                                <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px; margin-bottom: 32px;">
                                                    <p style="color: #1d4ed8; font-weight: 500; margin: 0;">You'll be among the first to experience the future of open-source funding!</p>
                                                </div>

                                                <h3 style="font-size: 20px; font-weight: 600; color: #1f2937; margin: 0 0 16px;">What GitFund Offers:</h3>
                                                <ul style="color: #4b5563; padding-left: 24px; margin: 0 0 32px;">
                                                    <li style="margin-bottom: 8px;">Crypto bounties for GitHub issues</li>
                                                    <li style="margin-bottom: 8px;">Seamless Web3 integration</li>
                                                    <li style="margin-bottom: 8px;">Direct rewards for contributors</li>
                                                    <li style="margin-bottom: 8px;">Community-driven project funding</li>
                                                </ul>

                                                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom: 32px;">
                                                    <tr>
                                                        <td style="background-color: #f9fafb; padding: 24px; border-radius: 8px;">
                                                            <h3 style="font-size: 20px; font-weight: 600; color: #1f2937; margin: 0 0 24px;">Perfect For</h3>
                                                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                                                <tr>
                                                                    <td width="33%" style="padding: 8px;">
                                                                        <div style="background-color: white; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb; text-align: center;">
                                                                            <div style="color: #2563eb; font-weight: bold; font-size: 18px; margin-bottom: 4px;">Open Source</div>
                                                                            <p style="color: #6b7280; font-size: 14px; margin: 0;">Fund your project's development</p>
                                                                        </div>
                                                                    </td>
                                                                    <td width="33%" style="padding: 8px;">
                                                                        <div style="background-color: white; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb; text-align: center;">
                                                                            <div style="color: #2563eb; font-weight: bold; font-size: 18px; margin-bottom: 4px;">Hackathons</div>
                                                                            <p style="color: #6b7280; font-size: 14px; margin: 0;">Quick bounty distribution</p>
                                                                        </div>
                                                                    </td>
                                                                    <td width="33%" style="padding: 8px;">
                                                                        <div style="background-color: white; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb; text-align: center;">
                                                                            <div style="color: #2563eb; font-weight: bold; font-size: 18px; margin-bottom: 4px;">Students</div>
                                                                            <p style="color: #6b7280; font-size: 14px; margin: 0;">Earn while learning</p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>

                                                <div style="background: linear-gradient(to right, #3b82f6, #2563eb); padding: 24px; border-radius: 8px; margin-bottom: 32px;">
                                                    <h3 style="color: white; font-size: 20px; font-weight: 600; margin: 0 0 12px;">How It Works</h3>
                                                    <p style="color: #eff6ff; margin: 0 0 8px;">1. Maintainers post GitHub issues with crypto bounties</p>
                                                    <p style="color: #eff6ff; margin: 0 0 8px;">2. Contributors browse and solve issues</p>
                                                    <p style="color: #eff6ff; margin: 0;">3. Get paid in crypto upon approval</p>
                                                </div>

                                                <div style="text-align: center;">
                                                    <a href="#" style="display: inline-block; background-color: #f59e0b; color: white; font-weight: bold; padding: 12px 32px; border-radius: 8px; text-decoration: none;">Share With Developer Friends</a>
                                                </div>
                                            </td>
                                        </tr>

                                        <!-- Footer -->
                                        <tr>
                                            <td style="background-color: #f9fafb; padding: 24px 32px; border-top: 1px solid #e5e7eb;">
                                                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                                    <tr>
                                                        <td style="text-align: center;">
                                                            <p style="color: #6b7280; font-size: 14px; margin: 0 0 16px;">&copy; 2025 GitFund. All rights reserved.</p>
                                                            <div style="margin-bottom: 24px;">
                                                                <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 8px;">Twitter</a>
                                                                <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 8px;">Instagram</a>
                                                                <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 8px;">LinkedIn</a>
                                                                <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 8px;">GitHub</a>
                                                            </div>
                                                            <p style="color: #9ca3af; font-size: 12px; margin: 0 0 8px;">GitFund Inc., 123 Developer Way, San Francisco, CA 94101</p>
                                                            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                                                                <a href="#" style="color: #2563eb; text-decoration: none;">Unsubscribe</a> &middot;
                                                                <a href="#" style="color: #2563eb; text-decoration: none;">Privacy Policy</a> &middot;
                                                                <a href="#" style="color: #2563eb; text-decoration: none;">Terms of Service</a>
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>
                    </html>
                `
            });

            return NextResponse.json({ 
                success: true, 
                emailSent: info.accepted.length > 0,
                messageId: info.messageId 
            });

        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Return success true because project was created even if email failed
            return NextResponse.json({ 
                success: true, 
                emailSent: false,
                error: 'Project created but notification email failed'
            });
        }

    } catch (error) {
        console.error('Error in project creation:', error);
        return NextResponse.json({ 
            success: false, 
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
export async function GET(request: Request) {
    // Logic for handling GET requests
    // For example, fetching and returning waitlist entries
    return NextResponse.json({ message: 'This is a GET request to save-waitlist' });
  }