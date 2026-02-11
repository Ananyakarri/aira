import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Activity, Thermometer, Footprints, Brain, Shield, Bell } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { AppFeatures } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [features, setFeatures] = useState<AppFeatures[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeatures();
  }, []);

  const loadFeatures = async () => {
    try {
      const result = await BaseCrudService.getAll<AppFeatures>('appfeatures', [], { limit: 3 });
      setFeatures(result.items);
    } catch (error) {
      console.error('Error loading features:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full pt-24 pb-16 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-5xl lg:text-7xl text-secondary mb-6">
              Health Overview
            </h1>
            <p className="font-paragraph text-xl text-secondary/70">
              Real-time biometric monitoring active
            </p>
          </motion.div>

          {/* Health Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg p-8 shadow-sm border border-secondary/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <span className="font-paragraph text-sm text-secondary/60 uppercase tracking-wide">Heart Rate</span>
              </div>
              <div className="font-heading text-5xl text-secondary mb-1">69</div>
              <div className="font-paragraph text-sm text-secondary/50">BPM</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg p-8 shadow-sm border border-secondary/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Thermometer className="w-6 h-6 text-blue-500" />
                </div>
                <span className="font-paragraph text-sm text-secondary/60 uppercase tracking-wide">Temperature</span>
              </div>
              <div className="font-heading text-5xl text-secondary mb-1">36.8</div>
              <div className="font-paragraph text-sm text-secondary/50">°C</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg p-8 shadow-sm border border-secondary/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <Footprints className="w-6 h-6 text-green-600" />
                </div>
                <span className="font-paragraph text-sm text-secondary/60 uppercase tracking-wide">Daily Steps</span>
              </div>
              <div className="font-heading text-5xl text-secondary mb-1">1,246</div>
              <div className="font-paragraph text-sm text-secondary/50">steps</div>
            </motion.div>
          </div>

          {/* Status Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-green-50 rounded-lg p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-6 h-6 text-green-600" />
                <span className="font-paragraph text-sm text-green-800 uppercase tracking-wide">Status Analysis</span>
              </div>
              <h2 className="font-heading text-5xl text-secondary mb-4">Normal</h2>
              <p className="font-paragraph text-lg text-secondary/70">
                Your physiological markers indicate a balanced state. Maintain your current routine.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-lg p-8 shadow-sm border border-secondary/10"
            >
              <h3 className="font-heading text-2xl text-secondary mb-6">Recommended Actions</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-heading text-base text-secondary">Mindful Breathing</div>
                    <div className="font-paragraph text-sm text-secondary/60">3 min session</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Footprints className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-heading text-base text-secondary">Nature Walk</div>
                    <div className="font-paragraph text-sm text-secondary/60">Goal: 10k steps</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 px-6 lg:px-12 bg-white">
        <div className="max-w-[120rem] mx-auto">
          <div className="mb-12">
            <h2 className="font-heading text-4xl lg:text-5xl text-secondary mb-4">
              System Capabilities
            </h2>
            <p className="font-paragraph text-lg text-secondary/70">
              Connect with top-rated mental health professionals
            </p>
          </div>

          {isLoading ? null : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background rounded-lg overflow-hidden border border-secondary/10 hover:shadow-lg transition-shadow"
                >
                  {feature.featureImage && (
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={feature.featureImage}
                        alt={feature.featureName || 'Feature'}
                        width={600}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-heading text-xl text-secondary mb-2">
                      {feature.featureName}
                    </h3>
                    <p className="font-paragraph text-secondary/70 mb-4">
                      {feature.shortDescription || feature.description}
                    </p>
                    {feature.learnMoreUrl && (
                      <a
                        href={feature.learnMoreUrl}
                        className="font-heading text-sm text-primary hover:underline uppercase tracking-wide"
                      >
                        Learn More
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Emergency Support Section */}
      <section className="w-full py-16 px-6 lg:px-12 bg-red-50">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg p-8 border-2 border-primary"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-2xl text-primary mb-2">
                  Automatic SOS Detection is Active
                </h3>
                <p className="font-paragraph text-secondary/70">
                  If high anxiety levels are detected for more than 5 minutes, AIRA will automatically contact your emergency contacts.
                </p>
              </div>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-heading uppercase text-sm tracking-wide rounded-lg hover:bg-primary/90 transition-colors"
            >
              Trigger SOS Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto text-center">
          <h2 className="font-heading text-4xl lg:text-6xl text-secondary mb-8">
            Ready to Get Started?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-10 py-4 bg-primary text-white font-heading uppercase text-sm tracking-wide rounded-lg hover:bg-primary/90 transition-colors"
            >
              View Dashboard
            </Link>
            <Link
              to="/doctors"
              className="inline-flex items-center justify-center px-10 py-4 border-2 border-secondary text-secondary font-heading uppercase text-sm tracking-wide rounded-lg hover:bg-secondary hover:text-white transition-colors"
            >
              Find Doctors
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}