'use strict'

var remarkPromise = new Promise(function (resolve, reject) {
  window.addEventListener('load', function (event) {
    remark.create({
      ratio: '16:9',
      navigation: {
        // Enable or disable navigating using scroll
        scroll: false,
        // Enable or disable navigation using touch
        touch: true,
        // Enable or disable navigation using click
        click: false
      }
    });
    resolve();
  });
});

var wordtreeDataPromise = new Promise(function (resolve, reject) {
  google.charts.load('current', {
    packages: ['wordtree'],
    callback: resolve
  });
});

var barDataPromise = new Promise(function (resolve, reject) {
  google.charts.load('current', {
    packages:['bar'],
    callback: resolve
  });
});

Promise.all([
  remarkPromise,
  wordtreeDataPromise
]).then(function () {
  drawChart();
  drawChart2();
});

Promise.all([
  remarkPromise,
  barDataPromise
]).then(function () {
  drawChart3();
});

function getSlideContainer(element) {
  var element;
  while (element.parentNode) {
    element = element.parentNode;
    if (element.classList.contains('remark-slide-container')) {
      return element;
    }
  }
  return null;
}

function observeSlideVisibility(element, callback) {
  var container = getSlideContainer(element);
  if (container.classList.contains('remark-visible')) {
    callback();
    return;
  }
  var observer = new MutationObserver(function (mutations) {
    mutations.some(function (mutation) {
      if (mutation.attributeName === 'class' &&
          mutation.target.classList.contains('remark-visible')) {
        callback();
        observer.disconnect();
        return true;
      }
    });
  });
  observer.observe(container, {
    attributes: true,
  });
}

function drawChart() {
  var data = google.visualization.arrayToDataTable(
    [
      ['Phrases'],
      ["Stereotype/ Design = how things look."],
      ["Stereotype/ Design = Process."],
      ["Stereotype/ Design = visual design."],
      ["Stereotype/ Design ain't just about drawing stuff (especially UI/UX)."],
      ["Stereotype/ Design as only creative expression."],
      ["Stereotype/ Design as solely an aesthetic exercise."],
      ["Stereotype/ Design can deliver business value, not just mitigate risk."],
      ["Stereotype/ Design can't solve problems because healthcare is too regulated."],
      ["Stereotype/ Design considerations are sometimes an unnecessary drag on development."],
      ["Stereotype/ Design contributes in strategy."],
      ["Stereotype/ Design decisions are not purely emotional."],
      ["Stereotype/ Design doesn't require overly pretentious discourse."],
      ["Stereotype/ Design doesn't solve business problems."],
      ["Stereotype/ Design equals visual design."],
      ["Stereotype/ Design equates to something visual."],
      ["Stereotype/ Design exists to make the product pretty."],
      ["Stereotype/ Design holds no place in business strategy."],
      ["Stereotype/ Design in not just about look and feel, its more about optimizing human and computer interaction/experience."],
      ["Stereotype/ Design is how it looks"],
      ["Stereotype/ Design is a not just a fancy layer that presents the functionality in more appealing manner. It is a defining factor of the functional foundation."],
      ["Stereotype/ Design is a process not an afterthought."],
      ["Stereotype/ Design is a resource."],
      ["Stereotype/ Design is a team sport - it's working with product, engineering, marketing, etc to be the voice of our users and provide them the best experience possible. No designing in a bubble!"],
      ["Stereotype/ Design is about beautification as opposed to strategic problem solvers."],
      ["Stereotype/ Design is about how stuff looks."],
      ["Stereotype/ Design is about making screens pretty."],
      ["Stereotype/ Design is about making things look nice (as opposed to influencing the whole user experience)"],
      ["Stereotype/ Design is about making things pretty."],
      ["Stereotype/ Design is about UI, not problem statements or backend architecture."],
      ["Stereotype/ Design is an afterthought in the outdoor industry."],
      ["Stereotype/ Design is an integral part of any product development. Designers need to sit at the table. Design can be revenue generating than just being an overhead expense."],
      ["Stereotype/ Design is cheap."],
      ["Stereotype/ Design is common sense."],
      ["Stereotype/ Design is critical to success - not optional but just as valuable as development, engineering and customer relations/sales."],
      ["Stereotype/ Design is easy and quick."],
      ["Stereotype/ Design is essentially business oriented."],
      ["Stereotype/ Design is expensive."],
      ["Stereotype/ Design is fluff."],
      ["Stereotype/ Design is for luxury products not for our customers."],
      ["Stereotype/ Design is how it looks like."],
      ["Stereotype/ Design is how it looks."],
      ["Stereotype/ Design is how it looks."],
      ["Stereotype/ Design is important to make things work better, not to look prettier."],
      ["Stereotype/ Design is important! Just as important as the technology."],
      ["Stereotype/ Design is just about drawing something."],
      ["Stereotype/ Design is just about the visualization."],
      ["Stereotype/ Design is just interfaces, images or buttons."],
      ["Stereotype/ Design is just not about look and feel but key to solving problems. As ML/ AI makes an impression in the world we live in designers should be paired with data scientists to make impact to create experiences more useful, pleasurable and delightful."],
      ["Stereotype/ Design is just production - making something pretty."],
      ["Stereotype/ Design is just to make it look nice."],
      ["Stereotype/ Design is just visual design."],
      ["Stereotype/ Design is less about how things look and more about how things work and function."],
      ["Stereotype/ Design is mainly about creating an interface, so designers are not essential in strategic conversations."],
      ["Stereotype/ Design is more complex and requires many sciences to be involved."],
      ["Stereotype/ Design is more than aesthetics."],
      ["Stereotype/ Design is more than just making it look pretty."],
      ["Stereotype/ Design is multi disciplinary. Build design teams around competencies you need and desire."],
      ["Stereotype/ Design is not about making something pretty, rather useful."],
      ["Stereotype/ Design is not about shapes and colour."],
      ["Stereotype/ Design is not about surface and is not an add-on. Design creates value, design asks (other)(different)(crucial) questions. Design is a fundament."],
      ["Stereotype/ Design is not about visual. There is no “design trends.” The truth is that design is constantly evolving."],
      ["Stereotype/ Design is not all aesthetics. We care about strategy and kick off every project with a design workshop rooted in strategy."],
      ["Stereotype/ Design is not art."],
      ["Stereotype/ Design is not beautification. (no, a lot of our clients still don't understand it)."],
      ["Stereotype/ Design is not colors and good taste."],
      ["Stereotype/ Design is not decoration."],
      ["Stereotype/ Design is not for free."],
      ["Stereotype/ Design is not how things look. Design is how things work, and this includes business processes, product, services, brand, experiential. There is nothing like a design on its own. It always serves some sort of a higher purpose."],
      ["Stereotype/ Design is not just esthetics."],
      ["Stereotype/ Design is not just for websites."],
      ["Stereotype/ Design is not just Look and Feel  and designer are not UI alone."],
      ["Stereotype/ Design is not only technical. It's only the looks and feel."],
      ["Stereotype/ Design is not style."],
      ["Stereotype/ Design is not the finishing touch."],
      ["Stereotype/ Design is only a way to attract the consumer, but design can also ease the use of any product touched by anyone, consumer or employee."],
      ["Stereotype/ Design is only designing interfaces."],
      ["Stereotype/ Design is only visual."],
      ["Stereotype/ Design is only visual."],
      ["Stereotype/ Design is polish and used to empty marketing budgets."],
      ["Stereotype/ Design is SO MUCH more than just making things pretty."],
      ["Stereotype/ Design is strategy, not just execution."],
      ["Stereotype/ Design is the chassis on the car.  Design actually applies to thinking and strategy just as much as output and final polish. Design should, in fact, have a key role in concept stages."],
      ["Stereotype/ Design is the skin of the product and it's never more important than development, so it always gets less time."],
      ["Stereotype/ Design is too often understood as styling (making things attractive). Impact on early process stages as strategy, requirement engineering or business models is often underestimated. Design RoI is very often not clear."],
      ["Stereotype/ Design is visual design."],
      ["Stereotype/ Design is way more than design execution, way beyond the interface. Design is human advocacy."],
      ["Stereotype/ Design isn't just about pictures."],
      ["Stereotype/ Design isn't that important."],
      ["Stereotype/ Design isn't pretty, it have to be correct and easy to perceive."],
      ["Stereotype/ Design it's only a layer of beauty for software."],
      ["Stereotype/ Design means making things look pretty and is not backed in strategic thinking and research with users."],
      ["Stereotype/ Design means pretty."],
      ["Stereotype/ Design only happens at the beginning of the process."],
      ["Stereotype/ Design os an afterthought."],
      ["Stereotype/ Design sprint can solve all our existing problems."],
      ["Stereotype/ Design thinking is expensive."],
      ["Stereotype/ Design Thinking is getting lost."],
      ["Stereotype/ Design wastes time."],
      ["Stereotype/ Design will slow down the process."],
      ["Stereotype/ Design without the why is just make up on another turd."],
      ["Stereotype/ Designer = Learning Designer."],
      ["Stereotype/ Designer are creative and are not good in business decisions."],
      ["Stereotype/ Designer are there to make things look good. They have magical skills and are more art-oriented. Designer can paint and do sketching very well."],
      ["Stereotype/ Designer can help you with defining your business goals;And help achieve them!"],
      ["Stereotype/ Designer doesn't make just visual side of product (pretty buttons, menu etc)"],
      ["Stereotype/ Designer don't go deep enough. Design is easier than programming."],
      ["Stereotype/ Designer is also a thinker and a stratagest."],
      ["Stereotype/ Designer is perceived as a miner."],
      ["Stereotype/ Designer make things beautiful."],
      ["Stereotype/ Designer make things beautiful."],
      ["Stereotype/ Designer to not understand tech."]
    ]
  );
  var options = {
    wordtree: {
      format: 'implicit',
      word: 'Stereotype/'
    }
  };
  var element = document.getElementById('wordtree_basic');
  observeSlideVisibility(element, function () {
    var chart = new google.visualization.WordTree(element);
    chart.draw(data, options);
  });
}

function drawChart2() {
  var data = google.visualization.arrayToDataTable(
    [
      ['Phrases'],
      ["Hey-Boss Advocate for a complete design process."],
      ["Hey-Boss Advocate for a design process in the c-suite and spend less time on pixel perfection."],
      ["Hey-Boss Advocate for better conversations around design, values, principles and outcomes to be more thoughtful, caring and innovative."],
      ["Hey-Boss Advocate for more design thinking in the organization."],
      ["Hey-Boss Advocate for the user."],
      ["Hey-Boss Advocate strongly for design and make decisions."],
      ["Hey-Boss Allow designers to innovate more."],
      ["Hey-Boss Allow for a start-up where there are no failures only learning opportunities that get's us closer to the truth about our customer needs."],
      ["Hey-Boss Allow for disagreements to not just happen, but fester and grow."],
      ["Hey-Boss Allow for failure."],
      ["Hey-Boss Allow me to implement and develop processes to understand the business for design execution and implementation."],
      ["Hey-Boss Allow more freedom of expression. Great ideas only come at the edges."],
      ["Hey-Boss Allow more time to explore alternative solutions."],
      ["Hey-Boss Allow some time to see the results of the initiatives tried."],
      ["Hey-Boss Allow us more time to prototype and do research in our downtime to develop new products rather than just constantly producing."],
      ["Hey-Boss Allow us time to explore. 10% Time to pursue personal projects and encourage creativity and exploration."],
      ["Hey-Boss Allow us to pursue our own interests."],
      ["Hey-Boss Allow yourself to be more vulnerable. Listen. Trust your research + design people; they're friends not foes."],
      ["Hey-Boss Ask good questions."],
      ["Hey-Boss Ask me more about what I need to show you what you need."],
      ["Hey-Boss Ask more questions about diverse perspectives (e.g. does this design have different meaning for different people)"],
      ["Hey-Boss Ask more questions to build empathy for designers, so that the directions can be better understood."],
      ["Hey-Boss Ask more questions, find more problems to discuss."],
      ["Hey-Boss Ask questions of your functional experts."],
      ["Hey-Boss Ask questions, listen actively, dont assume your way is the only way, respect and foster diversity of approaches and values."],
      ["Hey-Boss Be a better communicator. That means listening."],
      ["Hey-Boss Be a better listener."],
      ["Hey-Boss Be a coach that doesn't get caught up in the design details."],
      ["Hey-Boss Be a design lead."],
      ["Hey-Boss Be a design practitioner. Take the workshops more seriously. Frame your problems."],
      ["Hey-Boss Be a lot more open and inviting in org. processes, use collaborative design methods to improve things."],
      ["Hey-Boss Be a mentor."],
      ["Hey-Boss Be a stronger advocate for design with senior execs."],
      ["Hey-Boss Be a stronger advocate for the customer and let their needs inform solutions."],
      ["Hey-Boss Be able to clearly communicate the value of good design."],
      ["Hey-Boss Be an active partner in the creative process. Allow time for exploration and lead by supporting, inspiring and guiding."],
      ["Hey-Boss Be an example in caring about people and helping the org design to care about people."],
      ["Hey-Boss Be as open as you want everyone else to be."],
      ["Hey-Boss Be clear transmitting strategic organizational decisions."],
      ["Hey-Boss Be clearer in articulating vision. Be honest. Be empathetic."],
      ["Hey-Boss Be comfortable with a messy process. We often need to design it wrong before we know how to design it right."],
      ["Hey-Boss Be confident enough in your knowledge to give clear feedback and make (considerate) decisions."],
      ["Hey-Boss Be confident enough to give me space. Lift me , not yourself."],
      ["Hey-Boss Be decisive."],
      ["Hey-Boss Be driven."],
      ["Hey-Boss Be guide rails, but stay out of the way of creativity."],
      ["Hey-Boss Be honest and show empathy."],
      ["Hey-Boss Be honest."],
      ["Hey-Boss Be inspirational and keep learning."],
      ["Hey-Boss Be involved, critical, accountable, & grounded."],
      ["Hey-Boss Be less subjective and nurture a culture of empathy."],
      ["Hey-Boss Be more analytical and critical of the work more than of my client communication skills."],
      ["Hey-Boss Be more assertive and stand your ground against the mentality that design is secondary or impossible to achieve."],
      ["Hey-Boss Be more available (sometimes)"],
      ["Hey-Boss Be more aware."],
      ["Hey-Boss Be more brave with taking risks. A fail is also a learning."],
      ["Hey-Boss Be more clear about the business problem she/he feels is the highest order opportunity."],
      ["Hey-Boss Be more collaborative and let me work as I know. Less instructions more confrontation."],
      ["Hey-Boss Be more comfortable with your staff being vulnerable."],
      ["Hey-Boss Be more data-informed, not data -driven. Check employees' opinions more often, also those from other related departments."],
      ["Hey-Boss Be more decisive. Take a chance. Give us a chance to grow."],
      ["Hey-Boss Be more direct; tell me what you think needs to be done so we can discuss openly and in transparency."],
      ["Hey-Boss Be more emphatic. Walk the talk."],
      ["Hey-Boss Be more informed of the inherent power structures and hierarchies that exist within your org and in the context of the environment around y."],
      ["Hey-Boss Be more inspiring."],
      ["Hey-Boss Be more open to design directions that may not be as familiar."],
      ["Hey-Boss Be more organised."],
      ["Hey-Boss Be more outspoken."],
      ["Hey-Boss Be more present for your team."],
      ["Hey-Boss Be more present to guide young designer as we are educationally disadvantaged in design in this part of the world."],
      ["Hey-Boss Be more present. Physically, mentally."],
      ["Hey-Boss Be more self-reflective. Once a day – at the end of each day take 15min."],
      ["Hey-Boss Be more straightforward, follow through on promises."],
      ["Hey-Boss Be more transparent about the evolution of our product vision and objective."],
      ["Hey-Boss Be more transparent and make strides for design to be more involved in other areas of the company."],
      ["Hey-Boss Be my advocate while pushing me to explore different possibilites."],
      ["Hey-Boss Be my advocate; help me achieve my goals and give me honest feedback."],
      ["Hey-Boss Be open and curious, fight for our users and for good design."],
      ["Hey-Boss Be open minded to new ideas, points of view, ways of working. Do not create the environment of personal politics."],
      ["Hey-Boss Be open minded, be a good translator as a business person."],
      ["Hey-Boss Be open oblique abstract visionary faithful and have faith."],
      ["Hey-Boss Be open to design for a more accessible world."],
      ["Hey-Boss Be open to flipping design standards upside down."],
      ["Hey-Boss Be open to new ideas and concepts."],
      ["Hey-Boss Be open to purchasing appropriate hardware for the software."],
      ["Hey-Boss Be open to putting design first."],
      ["Hey-Boss Be open, growth minded. Experiment then test products a ridiculous amount of time for end users."],
      ["Hey-Boss Be patient. Invest in explorations."],
      ["Hey-Boss Be prepared to embrace ideas that they think are not perfect and to let people do things in ways they Do not think people should."],
      ["Hey-Boss Be present, and listen."],
      ["Hey-Boss Be proactive and experiment."],
      ["Hey-Boss Be proactive in helping me learn how to grow as a design leader."],
      ["Hey-Boss Be self-aware enough to know that you Do not have the answers and be brave enough to say so instead of faking the funk."],
      ["Hey-Boss Be supportive by ensuring design decisions and implemented thoughtfully and seriously and not secondary to decisions the tech team make."],
      ["Hey-Boss Be supportive. Build us up, Do not tear us down. Listen to us. Believe us the first time."]
    ]
  );
  var options = {
    wordtree: {
      format: 'implicit',
      word: 'Hey-Boss'
    }
  };
  var element = document.getElementById('wordtree_basic2');
  observeSlideVisibility(element, function () {
    var chart = new google.visualization.WordTree(element);
    chart.draw(data, options);
  });
}

function drawChart3() {
  var data = google.visualization.arrayToDataTable([
    ['Measures of value to a company', 'Low impact','High impact                ++|'],
    ['Happier customers', 13, 61],
    ['Customer behaviors', 22, 48],
    ['Internal pride', 33, 42],
    ['Increased earnings', 28, 39],
    ['External recognition', 36, 36],
    ['Lower costs', 47, 20]
  ]);
  var options = {
    legend: { position: 'bottom', alignment: 'start'},
    colors: ['#DDDEE0', '#6918F9'],
    chart: {
      title: 'Leah Buley Co. State of UX 2016 Survey',
      subtitle: 'To what extent has your organization found UX to be a driver of the following measures?'
    }
  };
  var element = document.getElementById('columnchart_material');
  observeSlideVisibility(element, function () {
    var chart = new google.charts.Bar(element);
    chart.draw(data, google.charts.Bar.convertOptions(options));
  });
}
