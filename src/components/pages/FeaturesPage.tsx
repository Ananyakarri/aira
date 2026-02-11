import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { AppFeatures } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FeaturesPage() {
  const [features, setFeatures] = useState<AppFeatures[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const limit = 6;

  useEffect(() => {
    loadFeatures();
  }, [skip]);

  const loadFeatures = async () => {
    try {
      const result = await BaseCrudService.getAll<AppFeatures>('appfeatures', [], { limit, skip });
      if (skip === 0) {
        setFeatures(result.items);
      } else {
        setFeatures(prev => [...prev, ...result.items]);
      }
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading features:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setSkip(prev => prev + limit);
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
              FEATURES THAT
              <br />
              <span className="text-primary">EMPOWER YOU</span>
            </h1>
            <p className="font-paragraph text-xl text-secondary-foreground/80 leading-relaxed max-w-2xl">
              Explore the comprehensive suite of tools and capabilities designed to keep you informed, supported, and in control of your health.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full bg-background py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="min-h-[600px]">
            {isLoading && skip === 0 ? (
              <div className="flex items-center justify-center py-24">
                <LoadingSpinner />
              </div>
            ) : features.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature._id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
                      className="group"
                    >
                      <div className="bg-background border-2 border-secondary/10 hover:border-primary rounded-sm overflow-hidden transition-all duration-300 h-full flex flex-col">
                        {feature.featureImage && (
                          <div className="relative h-72 overflow-hidden bg-highlightyellow/20">
                            <Image
                              src={feature.featureImage}
                              alt={feature.featureName || 'Feature'}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              width={400}
                            />
                          </div>
                        )}
                        <div className="p-8 flex-1 flex flex-col">
                          <h3 className="font-heading text-2xl uppercase text-secondary mb-4">
                            {feature.featureName}
                          </h3>
                          {feature.shortDescription && (
                            <p className="font-paragraph text-base text-secondary/70 mb-4">
                              {feature.shortDescription}
                            </p>
                          )}
                          {feature.description && (
                            <p className="font-paragraph text-base text-secondary/60 mb-6 flex-1">
                              {feature.description}
                            </p>
                          )}
                          {feature.benefit && (
                            <div className="bg-highlightyellow/20 p-4 rounded-sm mb-6">
                              <p className="font-heading text-xs uppercase text-secondary/70 mb-1">
                                Benefit
                              </p>
                              <p className="font-paragraph text-sm text-secondary">
                                {feature.benefit}
                              </p>
                            </div>
                          )}
                          {feature.learnMoreUrl && (
                            <a
                              href={feature.learnMoreUrl}
                              className="inline-flex items-center gap-2 font-heading text-sm uppercase text-primary hover:gap-3 transition-all"
                            >
                              Learn More
                              <ArrowRight className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {hasNext && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-12"
                  >
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoading}
                      className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-heading text-sm uppercase tracking-wide px-8 py-4 rounded-sm hover:bg-secondary/90 transition-colors disabled:opacity-50"
                    >
                      {isLoading ? 'Loading...' : 'Load More Features'}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}
              </>
            ) : (
              <div className="text-center py-24">
                <p className="font-paragraph text-xl text-secondary/60">
                  No features available at the moment
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Feature Categories Section */}
      <section className="w-full bg-highlightyellow py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-secondary p-8 rounded-sm"
            >
              <h3 className="font-heading text-3xl uppercase text-secondary-foreground mb-4">
                MONITORING
              </h3>
              <p className="font-paragraph text-base text-secondary-foreground/80">
                Real-time tracking of heart rate, temperature, and activity levels
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-secondary p-8 rounded-sm"
            >
              <h3 className="font-heading text-3xl uppercase text-secondary-foreground mb-4">
                ANALYSIS
              </h3>
              <p className="font-paragraph text-base text-secondary-foreground/80">
                AI-powered detection of stress, anxiety, and wellness states
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary p-8 rounded-sm"
            >
              <h3 className="font-heading text-3xl uppercase text-secondary-foreground mb-4">
                SUPPORT
              </h3>
              <p className="font-paragraph text-base text-secondary-foreground/80">
                Emergency assistance and AI chatbot for stress relief
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-secondary p-8 rounded-sm"
            >
              <h3 className="font-heading text-3xl uppercase text-secondary-foreground mb-4">
                REPORTS
              </h3>
              <p className="font-paragraph text-base text-secondary-foreground/80">
                Comprehensive health data reports and insights
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
