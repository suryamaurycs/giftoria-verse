
import React from 'react';
import { Heart } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

const About = () => {
  return (
    <>
      <Header />
      <CartDrawer />
      <PageWrapper>
        {/* Hero Section */}
        <section className="relative py-20 bg-giftoria-slate text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-2xl mx-auto animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
                Our Story
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Crafting memorable experiences through thoughtfully selected gifts.
              </p>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto prose prose-slate lg:prose-lg">
              <div className="animate-slide-up">
                <p className="lead">
                  At Giftoria, we believe that gifts are more than just objects—they're expressions of love, appreciation, and thoughtfulness.
                </p>
                
                <p>
                  Our journey began with a simple idea: to create a curated collection of meaningful gifts that celebrate life's special moments and everyday joys. We understand that finding the perfect gift can sometimes be challenging, which is why we've taken the guesswork out of gift-giving.
                </p>
                
                <h2>Our Philosophy</h2>
                <p>
                  Every product in our collection is carefully selected based on quality, craftsmanship, and uniqueness. We partner with artisans and brands that share our values of sustainability, ethical production, and attention to detail.
                </p>
                
                <p>
                  We believe in the power of presentation, which is why each gift is beautifully packaged with care. From the moment your recipient opens their Giftoria package, they'll feel the thought and consideration that went into selecting their gift.
                </p>
                
                <h2>Our Promise</h2>
                <p>
                  Whether you're celebrating a milestone, expressing gratitude, or simply brightening someone's day, we're here to help you find the perfect gift. Our team is dedicated to providing exceptional customer service and ensuring that your gift-giving experience is as delightful as the gift itself.
                </p>
                
                <p>
                  Thank you for choosing Giftoria. We're honored to be part of your special moments and look forward to helping you create meaningful connections through the art of gifting.
                </p>
                
                <div className="text-center my-12">
                  <Heart className="h-12 w-12 text-giftoria-slate mx-auto mb-4 animate-float" />
                  <p className="text-xl font-medium text-giftoria-slate">
                    Curated with care, delivered with love
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-medium mb-12">Meet Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="animate-slide-up">
                <div className="bg-white rounded-lg p-6 shadow-soft">
                  <div className="w-24 h-24 rounded-full bg-giftoria-slate/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-medium text-giftoria-slate">EW</span>
                  </div>
                  <h3 className="text-xl font-medium mb-1">Emma Wilson</h3>
                  <p className="text-gray-500 mb-4">Founder & Creative Director</p>
                  <p className="text-gray-600">
                    With a background in design and a passion for meaningful connections, Emma brings vision and creativity to Giftoria.
                  </p>
                </div>
              </div>
              
              <div className="animate-slide-up [animation-delay:100ms]">
                <div className="bg-white rounded-lg p-6 shadow-soft">
                  <div className="w-24 h-24 rounded-full bg-giftoria-slate/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-medium text-giftoria-slate">DL</span>
                  </div>
                  <h3 className="text-xl font-medium mb-1">David Lee</h3>
                  <p className="text-gray-500 mb-4">Product Curator</p>
                  <p className="text-gray-600">
                    David searches the globe for unique, high-quality products that tell a story and create meaningful experiences.
                  </p>
                </div>
              </div>
              
              <div className="animate-slide-up [animation-delay:200ms]">
                <div className="bg-white rounded-lg p-6 shadow-soft">
                  <div className="w-24 h-24 rounded-full bg-giftoria-slate/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-medium text-giftoria-slate">SR</span>
                  </div>
                  <h3 className="text-xl font-medium mb-1">Sophia Rodriguez</h3>
                  <p className="text-gray-500 mb-4">Customer Experience</p>
                  <p className="text-gray-600">
                    Sophia ensures every interaction with Giftoria is exceptional, from browsing to unboxing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default About;
