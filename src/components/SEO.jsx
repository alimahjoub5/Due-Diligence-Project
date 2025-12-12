import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, keywords, canonical, image, type = "website" }) => {
    const location = useLocation();

    // Retrieve global settings from localStorage (mocking context for now)
    const savedSettings = JSON.parse(localStorage.getItem('siteSettings') || '{}');

    const siteTitle = savedSettings.siteName || "Checkmate Security | #1 Background Checks & Due Diligence Germany";
    const fullTitle = title ? `${title} | ${savedSettings.siteName || 'Checkmate Security'}` : siteTitle;
    const metaDescription = description || savedSettings.description || "Secure your hiring with Checkmate Security. The #1 GDPR & BDSG compliant background check service in Germany. We offer criminal record verification, corporate due diligence, and pre-employment screening.";
    const metaKeywords = keywords || savedSettings.keywords || "background checks germany, führungszeugnis, pre-employment screening, corporate due diligence, BDSG compliance, criminal record check germany, employment verification, background check service europe";
    const googleVerification = savedSettings.googleVerification;

    // Default image
    const defaultImage = savedSettings.logo || "https://checkmatesis.com/images/logo-og.png";
    const ogImage = image || defaultImage;

    // Build canonical URL
    const baseUrl = "https://checkmatesis.com";
    const canonicalUrl = canonical || `${baseUrl}${location.pathname}`;

    return (
        <Helmet>
            {/* Basic Metadata */}
            <html lang="en" />
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Google Search Console Verification */}
            {googleVerification && <meta name="google-site-verification" content={googleVerification} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={fullTitle} />
            <meta property="og:site_name" content="Checkmate Security and Intelligent Services" />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:locale" content="de_DE" />
            <meta property="og:locale:alternate" content="en_US" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={ogImage} />
            <meta name="twitter:image:alt" content={fullTitle} />

            {/* Additional SEO */}
            <meta name="robots" content="index, follow" />
            <meta name="author" content="Checkmate Security and Intelligent Services" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            {/* Structured Data - JSON-LD */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Checkmate Security and Intelligent Services",
                    "url": baseUrl,
                    "logo": `${baseUrl}/logo.png`,
                    "description": metaDescription,
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Neue Mainzer Str. 52-58",
                        "addressLocality": "Frankfurt am Main",
                        "postalCode": "60311",
                        "addressCountry": "DE"
                    },
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "email": "info@checkmatesis.com",
                        "contactType": "Customer Service"
                    }
                })}
            </script>
        </Helmet>
    );
};

export default SEO;
