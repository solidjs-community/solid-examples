import styles from './SocialList.module.css';
export default function SocialList() {
  return (
    <ul role="list" class={styles.socialList}>
      <li>
        <a href="https://github.com/solidjs/solid">
          <span class="sr-only">Navigate to Github</span>
          <i class="fa-brands fa-github-square"></i>
        </a>
      </li>
      <li>
        <a href="https://www.reddit.com/r/solidjs/">
          <span class="sr-only">Navigate to Reddit</span>
          <i class="fa-brands fa-reddit-square"></i>
        </a>
      </li>
      <li>
        <a href="https://discord.com/invite/solidjs">
          <span class="sr-only">Navigate to Discord</span>
          <i class="fa-brands fa-discord"></i>
        </a>
      </li>
      <li>
        <a href="https://twitter.com/solid_js">
          <span class="sr-only">Navigate to Twitter</span>
          <i class="fa-brands fa-twitter-square"></i>
        </a>
      </li>
    </ul>
  );
}
