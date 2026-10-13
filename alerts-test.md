# Alerts Test

GitHub alerts, one case at a time. A blockquote whose **first line** is just
`[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]` or `[!CAUTION]` becomes a colored
box with an icon and a title. Each section says what you should see — the target
is how GitHub renders it.

Things to try once it's open:

- **Palettes** — switch between a light and a dark one. The alert colors change
  with it (darker hues on light pages, brighter on dark).
- **Export** (⋮ → Export HTML) — open the file it saves: the alerts, icons and
  colors should all be there.
- **Print** (`Ctrl+P`) — no alert should be split across two pages.
- **Edit** (`Ctrl+E`) — click an alert to edit it like any other block.

---

## 1. The five types

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

*You should see: five boxes — blue ⓘ Note, green bulb Tip, purple speech-bubble
Important, amber triangle Warning, red octagon Caution.*

## 2. Anything a quote can hold

> [!IMPORTANT]
> An alert can hold **bold**, *italic*, `code`, ~~struck~~ text and a
> [link](https://github.com).
>
> A second paragraph, after a blank `>` line.
>
> - a bullet list
> - [ ] a task
> - [x] a done task
>
> 1. a numbered list
> 2. second item
>
> ```js
> const answer = 42;   // a code block, highlighted
> ```
>
> | Column | Another |
> | --- | --- |
> | a table | inside |

*You should see: one purple box holding all of it — two paragraphs, three lists,
a highlighted code block and a table.*

## 3. Case doesn't matter

> [!tip]
> Lowercase marker.

> [!Warning]
> Mixed-case marker.

*You should see: a green Tip and an amber Warning, titled in the usual case.*

## 4. Spaces after the marker

> [!NOTE]   
> The marker line above ends in three spaces.

*You should see: a normal blue Note.*

## 5. Title only

> [!CAUTION]

*You should see: a red box with just its "Caution" title and nothing under it.*

## 6. Lazy continuation

> [!TIP]
> This line has a `>`,
but this one doesn't — it still belongs to the alert, as in any quote.

*You should see: one green Tip holding both lines as one paragraph.*

## 7. Back to back

> [!NOTE]
> First alert.

> [!WARNING]
> Second alert, after a blank line.

*You should see: two separate boxes.*

---

# Not alerts — these must stay plain quotes

Each of these should render as an ordinary grey blockquote, exactly as on GitHub.

## 8. Text on the marker's line

> [!NOTE] Text on the same line as the marker.

*You should see: a plain quote that starts with the literal text "[!NOTE]".*

## 9. Unknown type

> [!DANGER]
> GitHub has five types; this isn't one of them.

*You should see: a plain quote with "[!DANGER]" as text.*

## 10. Marker not on the first line

> A line before the marker.
> [!NOTE]
> The marker has to come first.

*You should see: a plain quote.*

## 11. Missing the `!`

> [NOTE]
> Without the exclamation mark it's just a bracket.

*You should see: a plain quote with "[NOTE]" as text.*

## 12. Inside a list

- A list item holding a quote:

  > [!NOTE]
  > GitHub only makes alerts at the top level of a document.

*You should see: a bullet with a plain quote under it, not a blue box.*

## 13. Inside another quote

> An outer quote.
>
> > [!WARNING]
> > Nested one level down.

*You should see: a quote within a quote, both plain.*

## 14. In a code block

```markdown
> [!NOTE]
> This is code, so it's shown as typed.
```

*You should see: the two lines as code, not a box.*

## 15. An ordinary quote

> Just a quote, with no marker at all.

*You should see: the usual grey blockquote — alerts haven't changed quotes.*
