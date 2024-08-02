<script>
  import { PUBLIC_PILL_URL } from '$env/static/public';
  import Icon from '@iconify/svelte';

  let endpoints= [
    {
      name: "/pill",
      return: "SVG",
      title: "Create a SVG pill",
      description: "Create a svg pill with the given parameters below.",
      example: `${PUBLIC_PILL_URL}/pill?1t=pill test`,
    },
    {
      name: "/pillng",
      return: "PNG",
      title: "Create a PNG pill",
      description: "Create a png pill with the given parameters below.",
      example: `${PUBLIC_PILL_URL}/pillng?1t=pill test`,
    },
    {
      name: "/brand",
      return: "SVG",
      title: "Create a SVG logo",
      description: "Create a logo with custom or base brand color if not specified (params: &l + &lc only).",
      example: `${PUBLIC_PILL_URL}/brand?1l=minipills`,
    }
  ]

  let parameters = [
    {
      name: "1t",
      type: "string",
      required: true,
      title: "First text",
      description: "First text of the pill. If it's a double pill, then it's the text on the left side.",
      example: "1t=Let's go",
    },
    {
      name: "1c",
      type: "string",
      required: false,
      default: "ffffff",
      title: "First text color",
      description: "First text color. You need to put it without the '#'",
      example: "&1c=ffffff",
    },
    {
      name: "1bc",
      type: "string",
      required: false,
      default: "212121",
      title: "First background color",
      description: "First background color. You need to put it without the '#'",
      example: "&1bc=212121",
    },
    {
      name: "2t",
      type: "string",
      required: false,
      default: "",
      title: "Second text",
      description: "Second text of the pill.",
      example: "&2t=on a road",
    },
    {
      name: "2c",
      type: "string",
      required: false,
      default: "ffffff",
      title: "Second text color",
      description: "Second text color. You need to put it without the '#'",
      example: "&2c=ffffff",
    },
    {
      name: "2bc",
      type: "string",
      required: false,
      default: "a12613",
      title: "Second background color",
      description: "Second background color. You need to put it without the '#'",
      example: "&2bc=a12613",
    },
    {
      name: "3t",
      type: "string",
      required: false,
      default: "",
      title: "Third text",
      description: "Third text of the pill.",
      example: "&3t=trip",
    },
    {
      name: "3c",
      type: "string",
      required: false,
      default: "ffffff",
      title: "Third text color",
      description: "Third text color. You need to put it without the '#'",
      example: "&3c=ffffff",
    },
    {
      name: "3bc",
      type: "string",
      required: false,
      default: "212121",
      title: "Third background color",
      description: "Third background color. You need to put it without the '#'",
      example: "&3bc=212121",
    },
    {
      name: "s",
      type: "",
      required: false,
      default: "",
      title: "Pill shadows",
      description: "Enable shadows for logo & pills text",
      example: "&s",
    },
    {
      name: "l",
      type: "string",
      required: false,
      title: "Logo",
      description: "Logo to appear in the first part of the pill. The value must be the simplified text you'll find above each logo on the logo page.",
      example: "&l=minipills",
    },
    {
      name: "lc",
      type: "string",
      required: false,
      default: "ffffff",
      title: "Logo color",
      description: "Color of the logo.",
      example: "&lc=ffffff",
    },
    {
      name: "sc",
      type: "float",
      required: false,
      default: "1.0",
      title: "Pill scale",
      description: "Size of the pill. The maximum is 10.",
      example: "&sc=2",
    },
    {
      name: "premade",
      type: "string",
      required: true,
      title: "Premade pill",
      description: "Build the premade pill of the given brand, this parameter takes precedence over all others if given.",
      example: "premade=minipills",
    }
  ]

</script>

<!-- HTML PAGE -->

<section class="c-back">
  <div class="mp-container first-section">
    <h1 class="mp-h1 doc-h1">DOCUMENTATION</h1>

    <div>
      <img src="{PUBLIC_PILL_URL}/pill?1t=All" alt="pill-test">
      <img src="{PUBLIC_PILL_URL}/pill?1t=yes" alt="pill-test">
      <img src="{PUBLIC_PILL_URL}/pill?1t=logos" alt="pill-test">
    </div>
  </div>

  <div class="mp-nav">
    <a class="nav-btn" href="/">Home</a>
    <a class="nav-btn" href="logo">Logos</a>
  </div>
</section>

<section class="bg-back min-screen">
  <div class="mp-doc-container">
    <h2 class="w-text">
      How to build pills ?
    </h2>
    <div class="w-text">
      <div>
        A pill is quick to build, with just one link to retrieve, whether it's a single or double pill.
      </div>
      <div class="link-display">
        {PUBLIC_PILL_URL}
      </div>
      <div class="mr-bottom">
        For people that <span class="bolding highlight">aren't used to build</span> the urls :
      </div>
      <div class="mr-bottom">
        The first param should be after the <span class="bolding highlight">?</span> directly, the others can be written in the order you want but need the <span class="bolding highlight">&</span> symbol before to say to the browser that's another parameter !
      </div>
      <div class="mr-bottom">
        Example: {PUBLIC_PILL_URL}/pill<span class="bolding highlight">?</span>first_param=blabla<span class="bolding highlight">&</span>second_param=blabla
      </div>
      <div>
        After this link you just have to add the following URL parameters.
      </div>
    </div>

    <h2 class="w-text">
      Current endpoints
    </h2>

    {#each endpoints as endpoint}
    <table class="w-text doc-table">
      <thead>
        <tr>
          <th class="mp-header-row">
            <div class="mp-flex-container">
              <!-- NAME & REQUIRED -->
              <span class="mp-param-title">
                { endpoint.name.toUpperCase() }
              </span>               

              <span class="bolding mp-optionnal mp-align-right">
                { endpoint.return }
              </span>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>

            <div class="bolding">
              {endpoint.title}
            </div>

            <!-- DESCRIPTION -->
            <div class="doc-row">
              {endpoint.description}
            </div>

            <!-- EXAMPLE -->
            <div class="doc-row">
              <span>
                Example
              </span>
              : 
              <a class="mp-ghost mp-link" href="{endpoint.example}" target="_blank">
                {endpoint.example}
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    {/each}

    <h2 class="w-text">
      Spacing caution
    </h2>

    <!-- STRING CAUTION -->
    <table class="w-text doc-table">
      <thead>
        <tr>
          <th class="mp-header-row">
            <div class="mp-flex-container">
              <!-- NAME & REQUIRED -->
              <span class="mp-param-title">
                String caution
              </span>               

              <span class="bolding mp-optionnal mp-align-right">
                BE AWARE
              </span>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>

            <div class="bolding">
              Spacing in url
            </div>

            <!-- DESCRIPTION -->
            <div>
              <div class="doc-row">
                Spacing in url can be done with spaces, %20 or underscores _. 
              </div>
              <div class="doc-row">
                <span class="mp-ghost">One underscore</span> is a space.
              </div>
              <div class="doc-row">
                <span class="mp-ghost">Two underscores</span> will create a unique underscore.
              </div>
            </div>

            <!-- EXAMPLE -->
            <div class="doc-row">
              <span>
                Example
              </span>
              : 
              <a class="mp-ghost mp-link" href="{PUBLIC_PILL_URL}/pill?1t=Hello_how_are_you_?" target="_blank">
                {PUBLIC_PILL_URL}/pill?1t=With_one_underscore_?
              </a>
            </div>
            <div class="doc-row">
              <span>
                Example
              </span>
              : 
              <a class="mp-ghost mp-link" href="{PUBLIC_PILL_URL}/pill?1t=With__two__underscores__?" target="_blank">
                {PUBLIC_PILL_URL}/pill?1t=With__two__underscores__?
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <h2 class="w-text">
      Pill parameters
    </h2>

    <div class="w-text mr-bottom">
      After the base link, put the following parameters to build your pill !
    </div>

    {#each parameters as parameter}
    <table class="w-text doc-table">
      <thead>
        <tr>
          <th class="mp-header-row">
            <div class="mp-flex-container">
              <!-- NAME & REQUIRED -->
              <span class="mp-param-title">
                {parameter.title.toUpperCase()}
              </span>               
  
              {#if parameter.required}
                <span class="bolding mp-required mp-align-right">
                  REQUIRED
                </span>
              {:else}
                <span class="bolding mp-optionnal mp-align-right">
                  OPTIONNAL
                </span>
              {/if}
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>

            <!-- PARAM & TYPE -->
            <div class="doc-row">
              <span>
                Param
              </span>
              :
              <span class="bolding">
                {parameter.name}
              </span>
              {#if parameter.type}
                :
                <span class="mp-ghost">
                  {parameter.type}
                </span>
              {/if}
            </div>

            <!-- DESCRIPTION -->
            <div class="doc-row">
              {parameter.description}
            </div>

            <!-- DEFAULT VALUE -->
            {#if parameter.default}
              <div class="doc-row">
                <span>
                  Default
                </span>
                :
                <span class="mp-ghost">
                  {parameter.default}
                </span>
              </div>
            {/if}

            <!-- EXAMPLE -->
            <div class="doc-row">
              <span>
                Example
              </span>
              : 
              <span class="mp-ghost">
                {parameter.example}
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    {/each}

  </div>
</section>

<style>
  .mp-link {
    color: white;
    text-decoration: none;
  }

  .mr-bottom {
    margin-bottom: 0.5rem;
  }

  .link-display {
    padding: 0.5rem 1rem 0.5rem 1rem;
    margin: auto;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    border: solid 1px white;
    border-radius: 5px;
    width: 20%;
  }

  .mp-flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .mp-align-right {
    margin-left: auto;
  }

  .mp-required {
    color: #f8af40;
  }

  .mp-optionnal {
    color: #1ec542;
  }

  .mp-header-row {
    padding-bottom: 1rem;
    padding-top: 1rem;
  }

  .mp-param-title {
    font-size: 1.2rem;
  }
  
  .doc-table {
    margin: auto;
    width: 80%;
    margin-bottom: 1rem;
  }

  .doc-row {
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }

  .mp-doc-container {
    text-align: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-right: 20%;
    padding-left: 20%;
  }

  @media (min-width: 1500px) {
    .doc-table {
      width: 50%;
      margin-bottom: 1rem;
    }
  }
  
  @media (max-width: 1700px) {
    
    .link-display {
      width: 80%;
    }

  }

  @media (max-width: 1000px) {

    .mp-doc-container {
      padding-top: 1rem;
      padding-bottom: 1rem;
      padding-right: 5%;
      padding-left: 5%;
    }

    .doc-table {
      width: 100%;
      margin-bottom: 1rem;
    }
  }
</style>