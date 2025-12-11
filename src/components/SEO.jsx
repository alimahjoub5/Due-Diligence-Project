import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, keywords, canonical, image, type = "website" }) => {
    const location = useLocation();
    const siteTitle = "Checkmate Security and Intelligent Services | Background Verification";
    const fullTitle = title ? `${title} | Checkmate Security` : siteTitle;
    const metaDescription = description || "GDPR-compliant background checks and due diligence for Germany & Europe. Verify candidates with strict adherence to BDSG standards.";
    const metaKeywords = keywords || "background checks germany, employment screening, due diligence, BDSG compliance, pre-employment screening";
    
    // Default image - you should replace this with your actual logo/image URL
    const defaultImage = "https://checkmatesis.com/og-image.jpg";
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
