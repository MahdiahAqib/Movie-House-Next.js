// pages/help/[...slug].js
import { useRouter } from 'next/router';

const helpContent = {
  "faqs": {
    title: "Frequently Asked Questions",
    content: "Here are some commonly asked questions and answers.",
  },
  "contact": {
    title: "Contact Us",
    content: "You can contact us at support@example.com.",
  },
  "privacy": {
    title: "Privacy Policy",
    content: "We value your privacy. Here's how we protect it.",
  }
};

export default function HelpDetailPage() {
  const router = useRouter();
  const slugArray = router.query.slug || [];
  const slug = slugArray.join("/");

  const { title, content } = helpContent[slug] || {
    title: "Help Topic Not Found",
    content: "Sorry, we couldn't find the help topic you're looking for.",
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
}
