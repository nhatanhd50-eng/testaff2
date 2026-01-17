export default async function handler(req, res) {
    const userAgent = req.headers['user-agent'] || '';
    const isMobile = /iPhone|Android|Mobile/i.test(userAgent);

    // 1. Lọc Desktop
    if (!isMobile) {
        console.log("REJECT: Desktop Device");
        return res.status(204).end();
    }

    // 2. Danh sách link xoay vòng (Thay bằng link của bạn)
    const myLinks = [
        "https://shope.ee/link_1",
        "https://shope.ee/link_2",
        "https://shope.ee/link_3"
    ];

    // 3. Kiểm tra giờ Việt Nam (8h - 23h)
    const vnHour = (new Date().getUTCHours() + 7) % 24;
    if (vnHour < 8 || vnHour > 23) {
        console.log(`STANDBY: Hour ${vnHour}`);
        return res.status(204).end();
    }

    const selected = myLinks[Math.floor(Math.random() * myLinks.length)];
    
    // 4. Thiết lập Header bảo mật & Chuyển hướng
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    console.log(`SUCCESS: Cookied via ${selected}`);
    return res.redirect(302, selected);
}