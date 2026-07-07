document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const revealItems = document.querySelectorAll('.scroll-trigger');
  const faqItems = document.querySelectorAll('.faq-item');
  const practiceGrid = document.getElementById('practice-grid');
  const practiceCount = document.getElementById('practice-count');
  const practiceSearch = document.getElementById('practice-search');
  const practiceFilters = document.querySelectorAll('[data-filter-group] .pill');

  const questions = [
    { title: 'Two Sum', difficulty: 'Easy', topic: 'Arrays', company: 'Amazon', description: 'Find two numbers that add up to a target value in a single pass using a hash map.', link: '#' },
    { title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', topic: 'Arrays', company: 'Microsoft', description: 'Compute the maximum profit with one transaction using a single scan.', link: '#' },
    { title: 'Contains Duplicate', difficulty: 'Easy', topic: 'Arrays', company: 'Google', description: 'Determine whether any value appears at least twice.', link: '#' },
    { title: 'Product of Array Except Self', difficulty: 'Medium', topic: 'Arrays', company: 'Amazon', description: 'Build the result array without using division.', link: '#' },
    { title: 'Subarray Sum Equals K', difficulty: 'Medium', topic: 'Arrays', company: 'Google', description: 'Count subarrays whose sum is exactly K using prefix sums.', link: '#' },
    { title: 'Container With Most Water', difficulty: 'Medium', topic: 'Arrays', company: 'Microsoft', description: 'Use two pointers to maximize the trapped area between bars.', link: '#' },
    { title: '3Sum', difficulty: 'Medium', topic: 'Arrays', company: 'Amazon', description: 'Find all unique triplets that sum to zero.', link: '#' },
    { title: 'Maximum Subarray', difficulty: 'Medium', topic: 'Arrays', company: 'TCS', description: 'Find the contiguous subarray with the largest sum.', link: '#' },
    { title: 'Group Anagrams', difficulty: 'Medium', topic: 'Strings', company: 'Google', description: 'Group words that are anagrams of each other efficiently.', link: '#' },
    { title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', topic: 'Strings', company: 'Google', description: 'Use a sliding window to keep track of the longest unique substring.', link: '#' },
    { title: 'Valid Parentheses', difficulty: 'Easy', topic: 'Strings', company: 'Microsoft', description: 'Validate whether a string is balanced with a stack.', link: '#' },
    { title: 'Longest Palindromic Substring', difficulty: 'Medium', topic: 'Strings', company: 'Amazon', description: 'Find the longest palindrome within a string.', link: '#' },
    { title: 'Minimum Window Substring', difficulty: 'Hard', topic: 'Strings', company: 'Google', description: 'Find the smallest substring containing all characters from a pattern.', link: '#' },
    { title: 'Implement strStr', difficulty: 'Easy', topic: 'Strings', company: 'Infosys', description: 'Find the index of the first occurrence of a needle in a haystack.', link: '#' },
    { title: 'Binary Tree Inorder Traversal', difficulty: 'Easy', topic: 'Trees', company: 'Microsoft', description: 'Traverse a binary tree in-order using recursion or iteration.', link: '#' },
    { title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', topic: 'Trees', company: 'Microsoft', description: 'Traverse a binary tree level by level and collect each level as a list.', link: '#' },
    { title: 'Validate Binary Search Tree', difficulty: 'Medium', topic: 'Trees', company: 'Amazon', description: 'Check whether a tree satisfies BST ordering constraints.', link: '#' },
    { title: 'Lowest Common Ancestor of a Binary Tree', difficulty: 'Medium', topic: 'Trees', company: 'Google', description: 'Find the lowest common ancestor of two nodes in a binary tree.', link: '#' },
    { title: 'Diameter of Binary Tree', difficulty: 'Medium', topic: 'Trees', company: 'Infosys', description: 'Find the longest path between any two nodes in a tree.', link: '#' },
    { title: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', topic: 'Trees', company: 'Amazon', description: 'Convert a tree into a string and reconstruct it later.', link: '#' },
    { title: 'Number of Islands', difficulty: 'Medium', topic: 'Graphs', company: 'Infosys', description: 'Count connected groups of land using DFS or BFS over a grid.', link: '#' },
    { title: 'Clone Graph', difficulty: 'Medium', topic: 'Graphs', company: 'Google', description: 'Create a deep copy of an undirected graph.', link: '#' },
    { title: 'Course Schedule', difficulty: 'Medium', topic: 'Graphs', company: 'Microsoft', description: 'Determine whether all courses can be completed given prerequisite constraints.', link: '#' },
    { title: 'Pacific Atlantic Water Flow', difficulty: 'Medium', topic: 'Graphs', company: 'Amazon', description: 'Find cells that can flow to both oceans.', link: '#' },
    { title: 'Rotting Oranges', difficulty: 'Medium', topic: 'Graphs', company: 'TCS', description: 'Simulate the spread of rot over time in a grid.', link: '#' },
    { title: 'Top K Frequent Elements', difficulty: 'Medium', topic: 'Heap', company: 'Amazon', description: 'Return the k most frequent numbers using a heap.', link: '#' },
    { title: 'Merge K Sorted Lists', difficulty: 'Hard', topic: 'Heap', company: 'Amazon', description: 'Merge multiple sorted linked lists efficiently using a priority queue.', link: '#' },
    { title: 'Kth Largest Element in an Array', difficulty: 'Medium', topic: 'Heap', company: 'Microsoft', description: 'Find the kth largest element using a min-heap.', link: '#' },
    { title: 'Climbing Stairs', difficulty: 'Easy', topic: 'DP', company: 'TCS', description: 'Compute the number of ways to reach the top using dynamic programming.', link: '#' },
    { title: 'Coin Change', difficulty: 'Medium', topic: 'DP', company: 'Amazon', description: 'Determine the minimum number of coins needed to make a target amount.', link: '#' },
    { title: 'Longest Increasing Subsequence', difficulty: 'Medium', topic: 'DP', company: 'Google', description: 'Find the length of the longest strictly increasing subsequence.', link: '#' },
    { title: 'House Robber', difficulty: 'Medium', topic: 'DP', company: 'Infosys', description: 'Maximize stolen money without robbing adjacent houses.', link: '#' },
    { title: 'Partition Equal Subset Sum', difficulty: 'Medium', topic: 'DP', company: 'Microsoft', description: 'Check if the array can be split into two subsets with equal sum.', link: '#' },
    { title: 'Word Break', difficulty: 'Medium', topic: 'DP', company: 'Amazon', description: 'Determine whether a string can be segmented into valid words.', link: '#' },
    { title: 'Unique Paths', difficulty: 'Medium', topic: 'DP', company: 'Google', description: 'Count the number of ways to reach the bottom-right corner of a grid.', link: '#' },
    { title: 'Find First and Last Position of Element in Sorted Array', difficulty: 'Medium', topic: 'Binary Search', company: 'Microsoft', description: 'Search for the first and last occurrence of a target in a sorted array.', link: '#' },
    { title: 'Search in Rotated Sorted Array', difficulty: 'Medium', topic: 'Binary Search', company: 'Amazon', description: 'Search efficiently in a rotated sorted array.', link: '#' },
    { title: 'Median of Two Sorted Arrays', difficulty: 'Hard', topic: 'Binary Search', company: 'Google', description: 'Find the median of two sorted arrays in logarithmic time.', link: '#' },
    { title: 'Koko Eating Bananas', difficulty: 'Medium', topic: 'Binary Search', company: 'Infosys', description: 'Minimize the eating speed required to finish bananas before the deadline.', link: '#' },
    { title: 'Merge Intervals', difficulty: 'Medium', topic: 'Sorting', company: 'TCS', description: 'Merge overlapping intervals into a compact list.', link: '#' },
    { title: 'Insert Interval', difficulty: 'Medium', topic: 'Sorting', company: 'Amazon', description: 'Insert a new interval while preserving sorted and non-overlapping order.', link: '#' },
    { title: 'Sort Colors', difficulty: 'Medium', topic: 'Sorting', company: 'Microsoft', description: 'Sort an array containing only 0, 1, and 2 using constant extra space.', link: '#' },
    { title: 'Linked List Cycle', difficulty: 'Easy', topic: 'Linked List', company: 'Google', description: 'Detect whether a linked list contains a cycle.', link: '#' },
    { title: 'Reverse Linked List', difficulty: 'Easy', topic: 'Linked List', company: 'TCS', description: 'Reverse a linked list iteratively or recursively.', link: '#' },
    { title: 'Merge Two Sorted Lists', difficulty: 'Easy', topic: 'Linked List', company: 'Infosys', description: 'Merge two sorted linked lists into a single sorted list.', link: '#' }
  ];

  const getActiveFilters = () => {
    const filters = {};
    document.querySelectorAll('[data-filter-group]').forEach((group) => {
      const activeButton = group.querySelector('.pill.active');
      filters[group.dataset.filterGroup] = activeButton?.dataset.value || 'All';
    });
    return filters;
  };

  const renderQuestions = () => {
    if (!practiceGrid) return;

    const searchText = practiceSearch?.value.toLowerCase() || '';
    const filters = getActiveFilters();

    const filteredQuestions = questions.filter((question) => {
      const matchesSearch = [question.title, question.description, question.topic, question.company]
        .join(' ')
        .toLowerCase()
        .includes(searchText);
      const matchesDifficulty = filters.difficulty === 'All' || question.difficulty === filters.difficulty;
      const matchesTopic = filters.topic === 'All' || question.topic === filters.topic;
      const matchesCompany = filters.company === 'All' || question.company === filters.company;

      return matchesSearch && matchesDifficulty && matchesTopic && matchesCompany;
    });

    practiceCount.textContent = `${filteredQuestions.length} question${filteredQuestions.length === 1 ? '' : 's'}`;

    practiceGrid.innerHTML = '';

    if (!filteredQuestions.length) {
      practiceGrid.innerHTML = '<div class="practice-empty">No questions match these filters yet. Try broadening your search.</div>';
      return;
    }

    filteredQuestions.forEach((question) => {
      const article = document.createElement('article');
      article.className = 'practice-card';
      article.innerHTML = `
        <div class="practice-card-top">
          <span class="practice-difficulty ${question.difficulty.toLowerCase()}">${question.difficulty}</span>
          <span class="practice-topic">${question.topic}</span>
        </div>
        <h3>${question.title}</h3>
        <div class="practice-meta">
          <span>${question.company}</span>
          <span>${question.topic}</span>
        </div>
        <p>${question.description}</p>
        <a href="${question.link}" class="btn btn-secondary">Solve Now <i class="fa-solid fa-arrow-right"></i></a>
      `;
      practiceGrid.appendChild(article);
    });
  };

  practiceFilters.forEach((button) => {
    button.addEventListener('click', () => {
      const group = button.closest('[data-filter-group]');
      group?.querySelectorAll('.pill').forEach((pill) => pill.classList.remove('active'));
      button.classList.add('active');
      renderQuestions();
    });
  });

  practiceSearch?.addEventListener('input', renderQuestions);
  renderQuestions();

  const toggleMenu = () => {
    navMenu?.classList.toggle('active');
  };

  mobileToggle?.addEventListener('click', toggleMenu);

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('active');
    });
  });

  const onScroll = () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }

    revealItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        item.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question');
    if (!button) return;

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      faqItems.forEach((other) => {
        other.classList.remove('active');
      });

      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
});
