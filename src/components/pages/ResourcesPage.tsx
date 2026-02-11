import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { HealthResources } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BookOpen, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ResourcesPage() {
  const [resources, setResources] = useState<HealthResources[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const limit = 9;

  useEffect(() => {
    loadResources();
  }, [skip]);

  const loadResources = async () => {
    try {
      const result = await BaseCrudService.getAll<HealthResources>('healthresources', [], { limit, skip });
      if (skip === 0) {
        setResources(result.items);
      } else {
        setResources(prev => [...prev, ...result.items]);
      }
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading resources:', error);
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
      <section className="w-full bg-highlightyellow py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <h1 className="font-heading text-6xl lg:text-8xl uppercase text-secondary mb-8 leading-none">
                HEALTH
                <br />
                <span className="text-primary">RESOURCES</span>
              </h1>
              <p className="font-paragraph text-xl text-secondary/80 leading-relaxed max-w-2xl">
                Expert insights, wellness tips, and educational content to help you understand and improve your health journey.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="w-48 h-48 bg-secondary rounded-sm flex items-center justify-center transform rotate-6">
                <BookOpen className="w-24 h-24 text-secondary-foreground" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="w-full bg-background py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="min-h-[600px]">
            {isLoading && skip === 0 ? (
              <div className="flex items-center justify-center py-24">
                <LoadingSpinner />
              </div>
            ) : resources.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {resources.map((resource, index) => (
                    <motion.article
                      key={resource._id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (index % 9) * 0.1 }}
                      className="group"
                    >
                      <div className="bg-background border-2 border-secondary/10 hover:border-primary rounded-sm overflow-hidden transition-all duration-300 h-full flex flex-col">
                        {resource.coverImage && (
                          <div className="relative h-64 overflow-hidden bg-secondary/5">
                            <Image
                              src={resource.coverImage}
                              alt={resource.articleTitle || 'Health Resource'}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              width={400}
                            />
                            {resource.category && (
                              <div className="absolute top-4 left-4">
                                <span className="bg-primary text-primary-foreground font-heading text-xs uppercase tracking-wide px-3 py-1 rounded-sm">
                                  {resource.category}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="p-8 flex-1 flex flex-col">
                          <h2 className="font-heading text-2xl uppercase text-secondary mb-4 leading-tight">
                            {resource.articleTitle}
                          </h2>
                          {resource.summary && (
                            <p className="font-paragraph text-base text-secondary/70 mb-6 flex-1">
                              {resource.summary}
                            </p>
                          )}
                          <button className="inline-flex items-center gap-2 font-heading text-sm uppercase text-primary hover:gap-3 transition-all self-start">
                            Read Article
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.article>
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
                      {isLoading ? 'Loading...' : 'Load More Resources'}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}
              </>
            ) : (
              <div className="text-center py-24">
                <p className="font-paragraph text-xl text-secondary/60">
                  No resources available at the moment
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
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
              EXPLORE TOPICS
            </h2>
            <p className="font-paragraph text-lg text-secondary-foreground/80 max-w-2xl mx-auto">
              Browse our collection of articles organized by health and wellness categories
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {['Stress Management', 'Mental Health', 'Physical Wellness', 'Sleep Quality', 'Nutrition'].map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-secondary-foreground/10 hover:bg-primary text-secondary-foreground font-heading text-sm uppercase tracking-wide px-6 py-4 rounded-sm transition-colors"
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-heading text-5xl lg:text-6xl uppercase text-primary-foreground mb-6 leading-tight">
              STAY INFORMED
            </h2>
            <p className="font-paragraph text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Get the latest health insights and wellness tips delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-sm font-paragraph text-base bg-primary-foreground text-secondary focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
              />
              <button className="bg-secondary text-secondary-foreground font-heading text-sm uppercase tracking-wide px-8 py-4 rounded-sm hover:bg-secondary/90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
