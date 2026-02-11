import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-secondary py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="font-heading text-6xl lg:text-8xl uppercase text-secondary-foreground mb-8 leading-none">
              GET IN
              <br />
              <span className="text-primary">TOUCH</span>
            </h1>
            <p className="font-paragraph text-xl text-secondary-foreground/80 leading-relaxed max-w-2xl">
              Have questions about AIRA? We're here to help. Send us a message and our team will get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="w-full bg-background py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="bg-background border-2 border-secondary/10 rounded-sm p-8 lg:p-12">
                <h2 className="font-heading text-3xl uppercase text-secondary mb-8">
                  SEND US A MESSAGE
                </h2>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-primary/10 border-2 border-primary text-secondary p-4 rounded-sm mb-6"
                  >
                    <p className="font-paragraph text-base">
                      Thank you for your message! We'll get back to you soon.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block font-heading text-sm uppercase text-secondary mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-secondary/20 rounded-sm font-paragraph text-base text-secondary bg-background focus:outline-none focus:border-primary transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-heading text-sm uppercase text-secondary mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-secondary/20 rounded-sm font-paragraph text-base text-secondary bg-background focus:outline-none focus:border-primary transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-heading text-sm uppercase text-secondary mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-secondary/20 rounded-sm font-paragraph text-base text-secondary bg-background focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="features">Features & Capabilities</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership Opportunities</option>
                      <option value="feedback">Feedback & Suggestions</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-heading text-sm uppercase text-secondary mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-secondary/20 rounded-sm font-paragraph text-base text-secondary bg-background focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading text-sm uppercase tracking-wide px-8 py-4 rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading text-3xl uppercase text-secondary mb-8">
                    CONTACT INFO
                  </h2>
                  <p className="font-paragraph text-base text-secondary/70 mb-8">
                    Reach out to us through any of these channels. We're committed to responding to all inquiries within 24 hours.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg uppercase text-secondary mb-1">
                        Email
                      </h3>
                      <p className="font-paragraph text-base text-secondary/70">
                        support@aira-health.com
                      </p>
                      <p className="font-paragraph text-sm text-secondary/60 mt-1">
                        For general inquiries
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg uppercase text-secondary mb-1">
                        Phone
                      </h3>
                      <p className="font-paragraph text-base text-secondary/70">
                        +1 (555) 123-4567
                      </p>
                      <p className="font-paragraph text-sm text-secondary/60 mt-1">
                        Mon-Fri, 9am-6pm EST
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg uppercase text-secondary mb-1">
                        Location
                      </h3>
                      <p className="font-paragraph text-base text-secondary/70">
                        123 Health Tech Plaza
                        <br />
                        San Francisco, CA 94102
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-highlightyellow p-8 rounded-sm mt-12">
                  <h3 className="font-heading text-2xl uppercase text-secondary mb-4">
                    QUICK RESPONSE
                  </h3>
                  <p className="font-paragraph text-base text-secondary/80">
                    Need immediate assistance? Our support team is available to help you with urgent matters related to health monitoring and emergency features.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-secondary py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl lg:text-6xl uppercase text-secondary-foreground mb-6">
              COMMON QUESTIONS
            </h2>
            <p className="font-paragraph text-lg text-secondary-foreground/80 max-w-2xl mx-auto">
              Find quick answers to frequently asked questions about AIRA
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                question: 'What devices are compatible with AIRA?',
                answer: 'AIRA works with most modern smartwatches including Apple Watch, Samsung Galaxy Watch, and Fitbit devices.'
              },
              {
                question: 'How accurate is the health monitoring?',
                answer: 'AIRA uses advanced algorithms to provide medical-grade accuracy in tracking heart rate, temperature, and activity levels.'
              },
              {
                question: 'Is my health data secure?',
                answer: 'Yes, all health data is encrypted and stored securely. We comply with HIPAA and GDPR regulations.'
              },
              {
                question: 'How does the emergency support work?',
                answer: 'When critical patterns are detected, AIRA can instantly alert emergency contacts or services with your location and health data.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-secondary-foreground/5 p-8 rounded-sm"
              >
                <h3 className="font-heading text-xl uppercase text-secondary-foreground mb-3">
                  {faq.question}
                </h3>
                <p className="font-paragraph text-base text-secondary-foreground/70">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
